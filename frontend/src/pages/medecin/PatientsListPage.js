import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa";
import "./PatientsListPage.css";

const patients = [
  {
    id: 1,
    nom: "Mouhamadou Gueye",
    age: "22 ans",
    derniereVisite: "15 juin 2026",
    tags: ["Hypertension légère", "Asthme infantile"],
  },
  {
    id: 2,
    nom: "Fatou Diallo",
    age: "45 ans",
    derniereVisite: "20 juin 2026",
    tags: ["Diabète type 2"],
  },
  {
    id: 3,
    nom: "Ibrahima Sow",
    age: "8 ans",
    derniereVisite: "5 juin 2026",
    tags: ["Suivi pédiatrique"],
  },
  {
    id: 4,
    nom: "Aïssatou Ndiaye",
    age: "34 ans",
    derniereVisite: "23 juin 2026",
    tags: ["Allergie pénicilline"],
  },
];

export default function PatientsListPage() {
  const [recherche, setRecherche] = useState("");

  const patientsFiltres = patients.filter((p) =>
    p.nom.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div className="patients-container">
      <h1>Mes <span>Patients</span></h1>
      <p>Liste des patients que vous suivez</p>

      <div className="patients-search">
        <FaSearch />
        <input
          type="text"
          placeholder="Rechercher un patient..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
      </div>

      <div className="patients-grid">
        {patientsFiltres.map((p) => (
          <div className="patient-card-item" key={p.id}>
            <div className="patient-avatar-sm">
              <FaUser color="#00C96B" />
            </div>
            <div className="patient-card-info">
              <h3>{p.nom}</h3>
              <p>{p.age}</p>
              <p>Dernière visite : {p.derniereVisite}</p>
              <div className="patient-card-tags">
                {p.tags.map((t, i) => (
                  <span key={i} className="patient-tag">{t}</span>
                ))}
              </div>
              <Link to="/patient/dossier" className="btn-voir-dossier">
                Voir le dossier
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}