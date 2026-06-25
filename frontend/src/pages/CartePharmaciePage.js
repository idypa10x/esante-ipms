import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { FaMapMarkerAlt, FaPhone, FaClock, FaLocationArrow, FaSpinner } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./CartePharmaciePage.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const iconeGarde = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
});

const iconeFermee = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
});

const iconeUser = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
});

function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, 14);
  }, [position, map]);
  return null;
}

function calculerDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
}

// Vérifie si une pharmacie est de garde selon l'heure actuelle
function estDeGarde(tags) {
  const now = new Date();
  const heure = now.getHours();
  const opening = tags?.opening_hours || "";
  // De garde = ouvert la nuit ou 24h/24
  if (opening.includes("24/7") || opening.includes("24h")) return true;
  if (heure >= 20 || heure < 8) {
    return opening.includes("night") || opening.toLowerCase().includes("garde");
  }
  return true; // pendant la journée, considéré ouvert
}

export default function CartePharmaciePage() {
  const [filtre, setFiltre] = useState("toutes");
  const [active, setActive] = useState(null);
  const [position, setPosition] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [loadingGeo, setLoadingGeo] = useState(true);
  const [loadingPharmacies, setLoadingPharmacies] = useState(false);
  const [erreurGeo, setErreurGeo] = useState(false);

  // 1. Géolocalisation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          setLoadingGeo(false);
        },
        () => {
          setPosition([14.6937, -17.4441]);
          setErreurGeo(true);
          setLoadingGeo(false);
        }
      );
    } else {
      setPosition([14.6937, -17.4441]);
      setLoadingGeo(false);
    }
  }, []);

  // 2. Chercher les pharmacies réelles via Overpass API (OpenStreetMap)
  useEffect(() => {
    if (!position) return;
    setLoadingPharmacies(true);

    const [lat, lng] = position;
    const rayon = 3000; // 3km autour

    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="pharmacy"](around:${rayon},${lat},${lng});
        way["amenity"="pharmacy"](around:${rayon},${lat},${lng});
      );
      out body;
      >;
      out skel qt;
    `;

    fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        const resultats = data.elements
          .filter((e) => e.lat && e.lon)
          .map((e, i) => ({
            id: e.id || i,
            nom: e.tags?.name || "Pharmacie",
            adresse: e.tags?.["addr:street"]
              ? `${e.tags["addr:housenumber"] || ""} ${e.tags["addr:street"]}`.trim()
              : "Adresse non disponible",
            telephone: e.tags?.phone || e.tags?.["contact:phone"] || "Non renseigné",
            horaires: e.tags?.opening_hours || "Horaires non renseignés",
            garde: estDeGarde(e.tags),
            lat: e.lat,
            lng: e.lon,
            distance: calculerDistance(lat, lng, e.lat, e.lon),
          }))
          .sort((a, b) => a.distance - b.distance);

        setPharmacies(resultats);
        setLoadingPharmacies(false);
      })
      .catch(() => {
        setLoadingPharmacies(false);
      });
  }, [position]);

  const pharmaciesFiltrees = pharmacies.filter((p) => {
    if (filtre === "garde") return p.garde;
    if (filtre === "ouvertes") return p.horaires?.includes("24/7") || p.horaires?.includes("24h");
    return true;
  });

  return (
    <div className="carte-container">
      <h1>Pharmacies <span>de Garde</span></h1>
      <p>Pharmacies réelles autour de vous via OpenStreetMap</p>

      {loadingGeo && (
        <div style={{ background: "var(--vert-clair)", borderRadius: 12, padding: "12px 20px", marginBottom: 20, color: "var(--vert-fonce)", fontWeight: 600, fontSize: 14 }}>
          📍 Récupération de votre position...
        </div>
      )}

      {erreurGeo && !loadingGeo && (
        <div style={{ background: "#FFF3CD", borderRadius: 12, padding: "12px 20px", marginBottom: 20, color: "#856404", fontWeight: 600, fontSize: 14 }}>
          ⚠️ Position non disponible — centré sur Dakar par défaut
        </div>
      )}

      {!loadingGeo && !erreurGeo && (
        <div style={{ background: "var(--vert-clair)", borderRadius: 12, padding: "12px 20px", marginBottom: 20, color: "var(--vert-fonce)", fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <FaLocationArrow /> Position détectée — recherche des pharmacies dans un rayon de 3 km...
        </div>
      )}

      {loadingPharmacies && (
        <div style={{ background: "var(--vert-clair)", borderRadius: 12, padding: "12px 20px", marginBottom: 20, color: "var(--vert-fonce)", fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <FaSpinner /> Chargement des pharmacies en cours...
        </div>
      )}

      {!loadingPharmacies && pharmacies.length === 0 && position && (
        <div style={{ background: "#FFF3CD", borderRadius: 12, padding: "12px 20px", marginBottom: 20, color: "#856404", fontWeight: 600, fontSize: 14 }}>
          ⚠️ Aucune pharmacie trouvée dans un rayon de 3 km
        </div>
      )}

      {!loadingPharmacies && pharmacies.length > 0 && (
        <div style={{ background: "var(--vert-clair)", borderRadius: 12, padding: "12px 20px", marginBottom: 20, color: "var(--vert-fonce)", fontWeight: 600, fontSize: 14 }}>
          ✅ {pharmacies.length} pharmacie(s) trouvée(s) autour de vous
        </div>
      )}

      <div className="filtre-bar">
        <button className={`filtre-btn ${filtre === "toutes" ? "active" : ""}`} onClick={() => setFiltre("toutes")}>
          🏥 Toutes ({pharmacies.length})
        </button>
        <button className={`filtre-btn ${filtre === "garde" ? "active" : ""}`} onClick={() => setFiltre("garde")}>
          🟢 De garde ({pharmacies.filter(p => p.garde).length})
        </button>
        <button className={`filtre-btn ${filtre === "ouvertes" ? "active" : ""}`} onClick={() => setFiltre("ouvertes")}>
          ⏰ 24h/24
        </button>
      </div>

      <div className="carte-layout">
        <div className="pharmacies-liste">
          {pharmaciesFiltrees.length === 0 && !loadingPharmacies && (
            <div style={{ color: "var(--gris)", fontSize: 14, padding: 20, textAlign: "center" }}>
              Aucune pharmacie pour ce filtre
            </div>
          )}
          {pharmaciesFiltrees.map((p) => (
            <div
              key={p.id}
              className={`pharmacie-card ${active?.id === p.id ? "active" : ""}`}
              onClick={() => setActive(p)}
            >
              <div className="pharmacie-card-header">
                <h3>{p.nom}</h3>
                {p.garde ? (
                  <span className="badge-garde">🟢 Garde</span>
                ) : (
                  <span className="badge-fermee">🔴 Fermée</span>
                )}
              </div>
              <p><FaMapMarkerAlt color="#00C96B" /> {p.adresse}</p>
              <p><FaPhone color="#00C96B" /> {p.telephone}</p>
              <p><FaClock color="#00C96B" /> {p.horaires}</p>
              <div className="distance">📍 {p.distance} km de vous</div>
              <button
                className="btn-itineraire"
                onClick={(e) => {
                  e.stopPropagation();
                  const origin = position ? `${position[0]},${position[1]}` : "";
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${p.lat},${p.lng}`,
                    "_blank"
                  );
                }}
              >
                🗺️ Itinéraire depuis ma position
              </button>
            </div>
          ))}
        </div>

        <div className="carte-map">
          {position && (
            <MapContainer center={position} zoom={14} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
              />
              <RecenterMap position={position} />

              <Marker position={position} icon={iconeUser}>
                <Popup><strong>📍 Vous êtes ici</strong></Popup>
              </Marker>

              {pharmaciesFiltrees.map((p) => (
                <Marker key={p.id} position={[p.lat, p.lng]} icon={p.garde ? iconeGarde : iconeFermee}>
                  <Popup>
                    <strong>{p.nom}</strong><br />
                    {p.adresse}<br />
                    {p.horaires}<br />
                    📍 {p.distance} km<br />
                    {p.garde ? "✅ De garde" : "❌ Fermée"}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
}