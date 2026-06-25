import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./PlanningPage.css";

const jours = [
  { nom: "Lun", num: 22, rdv: 3 },
  { nom: "Mar", num: 23, rdv: 4 },
  { nom: "Mer", num: 24, rdv: 2 },
  { nom: "Jeu", num: 25, rdv: 4 },
  { nom: "Ven", num: 26, rdv: 1 },
  { nom: "Sam", num: 27, rdv: 0 },
  { nom: "Dim", num: 28, rdv: 0 },
];

const creneauxParJour = {
  25: [
    { heure: "08h30", patient: "Mouhamadou Gueye", motif: "Infection respiratoire", libre: false },
    { heure: "09h00", patient: "Fatou Diallo", motif: "Suivi tension artérielle", libre: false },
    { heure: "09h30", patient: null, motif: null, libre: true },
    { heure: "10h00", patient: null, motif: null, libre: true },
    { heure: "10h30", patient: "Ibrahima Sow", motif: "Bilan annuel", libre: false },
    { heure: "11h00", patient: null, motif: null, libre: true },
    { heure: "14h00", patient: "Aïssatou Ndiaye", motif: "Douleurs abdominales", libre: false },
    { heure: "14h30", patient: null, motif: null, libre: true },
  ],
};

export default function PlanningPage() {
  const [jourActif, setJourActif] = useState(25);

  const creneaux = creneauxParJour[jourActif] || [
    { heure: "08h30", patient: null, motif: null, libre: true },
    { heure: "09h00", patient: null, motif: null, libre: true },
    { heure: "09h30", patient: null, motif: null, libre: true },
  ];

  return (
    <div className="planning-container">
      <h1>Mon <span>Planning</span></h1>
      <p>Gérez vos rendez-vous et vos disponibilités</p>

      <div className="planning-nav">
        <button className="nav-btn"><FaChevronLeft /></button>
        <h2>Semaine du 22 au 28 juin 2026</h2>
        <button className="nav-btn"><FaChevronRight /></button>
      </div>

      <div className="jours-grid">
        {jours.map((j) => (
          <div
            key={j.num}
            className={`jour-card ${jourActif === j.num ? "active" : ""}`}
            onClick={() => setJourActif(j.num)}
          >
            <div className="jour-nom">{j.nom}</div>
            <div className="jour-num">{j.num}</div>
            <div className="jour-count">{j.rdv} RDV</div>
          </div>
        ))}
      </div>

      <div className="creneaux-jour">
        <h3>Créneaux du {jourActif} juin 2026</h3>
        {creneaux.map((c, i) => (
          <div className={`creneau-planning-item ${c.libre ? "libre" : ""}`} key={i}>
            <span className="creneau-heure">{c.heure}</span>
            <div className="creneau-detail">
              {c.libre ? (
                <h4>Créneau disponible</h4>
              ) : (
                <>
                  <h4>{c.patient}</h4>
                  <p>{c.motif}</p>
                </>
              )}
            </div>
            <span className={`creneau-statut ${c.libre ? "libre" : ""}`}>
              {c.libre ? "Libre" : "Réservé"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}