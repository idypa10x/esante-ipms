import { Link } from "react-router-dom";
import {
  FaPills, FaFileMedical, FaBoxes,
  FaComments, FaChartBar, FaExclamationTriangle
} from "react-icons/fa";
import "./PharmacienHome.css";

const ordonnancesRecentes = [
  { id: 1, patient: "Mouhamadou Gueye", medecin: "Dr. Diallo", date: "25 juin 2026", statut: "en-attente" },
  { id: 2, patient: "Fatou Diallo", medecin: "Dr. Ndiaye", date: "25 juin 2026", statut: "en-attente" },
  { id: 3, patient: "Ibrahima Sow", medecin: "Dr. Sow", date: "24 juin 2026", statut: "delivree" },
  { id: 4, patient: "Aïssatou Ndiaye", medecin: "Dr. Diop", date: "24 juin 2026", statut: "delivree" },
];

export default function PharmacienHome() {
  return (
    <div className="pharmacien-container">
      <div className="pharmacien-header">
        <h1>Bonjour, <span>Pharmacie Centrale</span> 💊</h1>
        <p>Tableau de bord de votre pharmacie</p>
      </div>

      {/* STATS */}
      <div className="pharmacien-stats">
        <div className="pharmacien-stat">
          <FaFileMedical className="stat-icon" />
          <div className="stat-val">8</div>
          <div className="stat-lbl">Ordonnances en attente</div>
        </div>
        <div className="pharmacien-stat">
          <FaPills className="stat-icon" />
          <div className="stat-val">342</div>
          <div className="stat-lbl">Médicaments en stock</div>
        </div>
        <div className="pharmacien-stat">
          <FaExclamationTriangle className="stat-icon" style={{ color: "#FF9800" }} />
          <div className="stat-val">5</div>
          <div className="stat-lbl">Stocks faibles</div>
        </div>
        <div className="pharmacien-stat">
          <FaChartBar className="stat-icon" />
          <div className="stat-val">47</div>
          <div className="stat-lbl">Ventes aujourd'hui</div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="pharmacien-actions">
        <Link to="/pharmacien/ordonnances">
          <div className="pharmacien-action-card">
            <FaFileMedical className="action-icon" />
            <h3>Ordonnances</h3>
            <p>Gérer les prescriptions reçues</p>
          </div>
        </Link>
        <Link to="/pharmacien/stock">
          <div className="pharmacien-action-card">
            <FaBoxes className="action-icon" />
            <h3>Gestion du Stock</h3>
            <p>Suivre les médicaments disponibles</p>
          </div>
        </Link>
        <Link to="/pharmacien/commandes">
          <div className="pharmacien-action-card">
            <FaPills className="action-icon" />
            <h3>Commandes</h3>
            <p>Commandes en ligne à préparer</p>
          </div>
        </Link>
        <Link to="/pharmacien/messagerie">
          <div className="pharmacien-action-card">
            <FaComments className="action-icon" />
            <h3>Messagerie</h3>
            <p>Contacter médecins et patients</p>
          </div>
        </Link>
      </div>

      {/* ORDONNANCES RECENTES */}
      <div className="ordonnances-recentes">
        <h2>📋 Ordonnances récentes</h2>
        {ordonnancesRecentes.map((o) => (
          <div className="ordonnance-item" key={o.id}>
            <div className="ordonnance-item-info">
              <h4>{o.patient}</h4>
              <p>{o.medecin} · {o.date}</p>
            </div>
            {o.statut === "en-attente" ? (
              <button className="btn-delivrer">Délivrer</button>
            ) : (
              <span className="badge-delivered">✅ Délivrée</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}