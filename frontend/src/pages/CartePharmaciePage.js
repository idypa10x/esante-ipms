import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaMapMarkerAlt, FaPhone, FaClock } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./CartePharmaciePage.css";

// Fix icône Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const pharmacies = [
  {
    id: 1,
    nom: "Pharmacie Centrale IPMS",
    adresse: "Avenue Bourguiba, Dakar",
    telephone: "33 123 45 67",
    horaires: "24h/24",
    garde: true,
    lat: 14.6937,
    lng: -17.4441,
    distance: "0.3 km",
  },
  {
    id: 2,
    nom: "Pharmacie du Plateau",
    adresse: "Rue Carnot, Plateau, Dakar",
    telephone: "33 821 30 10",
    horaires: "08h - 22h",
    garde: true,
    lat: 14.6928,
    lng: -17.4467,
    distance: "0.7 km",
  },
  {
    id: 3,
    nom: "Pharmacie Liberté",
    adresse: "Liberté 6, Dakar",
    telephone: "33 867 44 22",
    horaires: "08h - 20h",
    garde: false,
    lat: 14.7167,
    lng: -17.4667,
    distance: "2.1 km",
  },
  {
    id: 4,
    nom: "Pharmacie Sacré-Cœur",
    adresse: "Sacré-Cœur 3, Dakar",
    telephone: "33 864 12 34",
    horaires: "08h - 23h",
    garde: true,
    lat: 14.7089,
    lng: -17.4731,
    distance: "3.4 km",
  },
  {
    id: 5,
    nom: "Pharmacie Mermoz",
    adresse: "Mermoz, Dakar",
    telephone: "33 860 55 77",
    horaires: "08h - 20h",
    garde: false,
    lat: 14.7023,
    lng: -17.4812,
    distance: "4.2 km",
  },
];

export default function CartePharmaciePage() {
  const [filtre, setFiltre] = useState("toutes");
  const [active, setActive] = useState(null);

  const pharmaciesFiltrees = pharmacies.filter((p) => {
    if (filtre === "garde") return p.garde;
    if (filtre === "ouvertes") return p.horaires === "24h/24";
    return true;
  });

  return (
    <div className="carte-container">
      <h1>Pharmacies <span>de Garde</span></h1>
      <p>Localisez les pharmacies ouvertes et de garde près de vous</p>

      <div className="filtre-bar">
        <button
          className={`filtre-btn ${filtre === "toutes" ? "active" : ""}`}
          onClick={() => setFiltre("toutes")}
        >
          🏥 Toutes
        </button>
        <button
          className={`filtre-btn ${filtre === "garde" ? "active" : ""}`}
          onClick={() => setFiltre("garde")}
        >
          🟢 De garde
        </button>
        <button
          className={`filtre-btn ${filtre === "ouvertes" ? "active" : ""}`}
          onClick={() => setFiltre("ouvertes")}
        >
          ⏰ 24h/24
        </button>
      </div>

      <div className="carte-layout">
        {/* LISTE */}
        <div className="pharmacies-liste">
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
              <div className="distance">📍 {p.distance}</div>
              {p.garde && (
                <button
                  className="btn-itineraire"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`,
                      "_blank"
                    );
                  }}
                >
                  🗺️ Itinéraire
                </button>
              )}
            </div>
          ))}
        </div>

        {/* CARTE */}
        <div className="carte-map">
          <MapContainer
            center={[14.6937, -17.4441]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />
            {pharmaciesFiltrees.map((p) => (
              <Marker key={p.id} position={[p.lat, p.lng]}>
                <Popup>
                  <strong>{p.nom}</strong><br />
                  {p.adresse}<br />
                  {p.horaires}<br />
                  {p.garde ? "✅ De garde" : "❌ Fermée"}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}