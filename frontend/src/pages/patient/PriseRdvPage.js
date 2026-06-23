import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserMd } from "react-icons/fa";
import "./PriseRdvPage.css";

const medecins = [
  { id: 1, nom: "Dr. Amadou Diallo", specialite: "Médecin Généraliste", experience: "12 ans" },
  { id: 2, nom: "Dr. Fatou Ndiaye", specialite: "Cardiologue", experience: "8 ans" },
  { id: 3, nom: "Dr. Ibrahima Sow", specialite: "Pédiatre", experience: "15 ans" },
  { id: 4, nom: "Dr. Aïssatou Diop", specialite: "Dermatologue", experience: "6 ans" },
];

const creneaux = [
  "08h00", "08h30", "09h00", "09h30", "10h00",
  "10h30", "11h00", "14h00", "14h30", "15h00",
  "15h30", "16h00", "16h30", "17h00",
];

export default function PriseRdvPage() {
  const [medecinSelectionne, setMedecinSelectionne] = useState(null);
  const [creneauSelectionne, setCreneauSelectionne] = useState(null);
  const navigate = useNavigate();

  const handleConfirmer = () => {
    alert(`RDV confirmé avec ${medecinSelectionne.nom} à ${creneauSelectionne} !`);
    navigate("/patient");
  };

  return (
    <div className="rdv-container">
      <h1>Prendre un <span>rendez-vous</span></h1>
      <p>Choisissez un médecin et un créneau disponible</p>

      <div className="medecins-grid">
        {medecins.map((m) => (
          <div
            key={m.id}
            className={`medecin-card ${medecinSelectionne?.id === m.id ? "selected" : ""}`}
            onClick={() => setMedecinSelectionne(m)}
          >
            <div className="medecin-avatar">
              <FaUserMd color="#00C96B" />
            </div>
            <h3>{m.nom}</h3>
            <p>{m.specialite}</p>
            <p>{m.experience} d'expérience</p>
            <span className="medecin-dispo">Disponible</span>
          </div>
        ))}
      </div>

      {medecinSelectionne && (
        <div className="creneaux-section">
          <h2>Créneaux disponibles — {medecinSelectionne.nom}</h2>
          <div className="creneaux-grid">
            {creneaux.map((c) => (
              <button
                key={c}
                className={`creneau-btn ${creneauSelectionne === c ? "selected" : ""}`}
                onClick={() => setCreneauSelectionne(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        className="confirmer-btn"
        disabled={!medecinSelectionne || !creneauSelectionne}
        onClick={handleConfirmer}
      >
        Confirmer le rendez-vous
      </button>
    </div>
  );
}