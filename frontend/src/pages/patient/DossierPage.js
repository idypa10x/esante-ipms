import { FaUser, FaHeartbeat, FaHistory, FaAllergies } from "react-icons/fa";
import "./DossierPage.css";

const consultations = [
  {
    id: 1,
    medecin: "Dr. Amadou Diallo",
    specialite: "Généraliste",
    date: "15 juin 2026",
    notes: "Infection respiratoire légère. Prescription d'antibiotiques.",
  },
  {
    id: 2,
    medecin: "Dr. Fatou Ndiaye",
    specialite: "Cardiologue",
    date: "10 juin 2026",
    notes: "Tension artérielle légèrement élevée. Suivi recommandé.",
  },
  {
    id: 3,
    medecin: "Dr. Ibrahima Sow",
    specialite: "Pédiatre",
    date: "5 juin 2026",
    notes: "Bilan de santé annuel. Tout est normal.",
  },
];

export default function DossierPage() {
  return (
    <div className="dossier-container">
      <h1>Mon <span>Dossier Médical</span></h1>
      <p>Votre historique de santé complet et sécurisé</p>

      <div className="dossier-grid">
        {/* PROFIL */}
        <div className="dossier-profil">
          <div className="dossier-avatar">
            <FaUser color="#00C96B" />
          </div>
          <h2>Mouhamadou Gueye</h2>
          <p>Patient IPMS</p>

          <div className="info-item">
            <span>Date de naissance</span>
            <span>12/03/2004</span>
          </div>
          <div className="info-item">
            <span>Groupe sanguin</span>
            <span>O+</span>
          </div>
          <div className="info-item">
            <span>Taille</span>
            <span>178 cm</span>
          </div>
          <div className="info-item">
            <span>Poids</span>
            <span>72 kg</span>
          </div>
          <div className="info-item">
            <span>Médecin traitant</span>
            <span>Dr. Diallo</span>
          </div>
        </div>

        {/* CONTENU */}
        <div className="dossier-contenu">
          {/* Antécédents */}
          <div className="dossier-section">
            <h3><FaHeartbeat /> Antécédents médicaux</h3>
            <div className="antecedent-list">
              {["Hypertension légère", "Asthme infantile", "Appendicite (2018)"].map((a, i) => (
                <span key={i} className="antecedent-tag">{a}</span>
              ))}
            </div>
          </div>

          {/* Allergies */}
          <div className="dossier-section">
            <h3><FaAllergies /> Allergies</h3>
            <div className="antecedent-list">
              {["Pénicilline", "Arachides"].map((a, i) => (
                <span key={i} className="antecedent-tag" style={{ backgroundColor: "#FFE8E8", color: "#CC0000" }}>
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Historique */}
          <div className="dossier-section">
            <h3><FaHistory /> Historique des consultations</h3>
            {consultations.map((c) => (
              <div className="consultation-item" key={c.id}>
                <h4>{c.medecin} — {c.specialite}</h4>
                <p>{c.date} · {c.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}