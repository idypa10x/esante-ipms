import { Link, useNavigate } from "react-router-dom";
import {
  FaCalendarAlt, FaUserInjured, FaFileMedical,
  FaVideo, FaComments, FaChartBar
} from "react-icons/fa";
import "./MedecinHome.css";

const rdvsAujourdhui = [
  { id: 1, patient: "Mouhamadou Gueye", motif: "Infection respiratoire", heure: "08h30" },
  { id: 2, patient: "Fatou Diallo", motif: "Suivi tension artérielle", heure: "09h00" },
  { id: 3, patient: "Ibrahima Sow", motif: "Bilan annuel", heure: "10h30" },
  { id: 4, patient: "Aïssatou Ndiaye", motif: "Douleurs abdominales", heure: "14h00" },
];

export default function MedecinHome() {
  const navigate = useNavigate();

  return (
    <div className="medecin-container">
      <div className="medecin-header">
        <h1>Bonjour, <span>Dr. Diallo</span> 👨‍⚕️</h1>
        <p>Voici votre tableau de bord médical du jour</p>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <FaCalendarAlt className="stat-icon" />
          <div className="stat-value">4</div>
          <div className="stat-label">RDV aujourd'hui</div>
        </div>
        <div className="stat-card">
          <FaUserInjured className="stat-icon" />
          <div className="stat-value">128</div>
          <div className="stat-label">Patients suivis</div>
        </div>
        <div className="stat-card">
          <FaFileMedical className="stat-icon" />
          <div className="stat-value">12</div>
          <div className="stat-label">Ordonnances ce mois</div>
        </div>
        <div className="stat-card">
          <FaVideo className="stat-icon" />
          <div className="stat-value">2</div>
          <div className="stat-label">Consultations vidéo</div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="medecin-actions">
        <Link to="/medecin/planning">
          <div className="action-card">
            <FaCalendarAlt className="action-icon" />
            <h3>Mon Planning</h3>
            <p>Gérer mes rendez-vous</p>
          </div>
        </Link>
        <Link to="/medecin/patients">
          <div className="action-card">
            <FaUserInjured className="action-icon" />
            <h3>Mes Patients</h3>
            <p>Accéder aux dossiers</p>
          </div>
        </Link>
        <Link to="/medecin/ordonnance">
          <div className="action-card">
            <FaFileMedical className="action-icon" />
            <h3>Ordonnance</h3>
            <p>Rédiger une prescription</p>
          </div>
        </Link>
        <Link to="/medecin/video">
          <div className="action-card">
            <FaVideo className="action-icon" />
            <h3>Consultation Vidéo</h3>
            <p>Démarrer une téléconsultation</p>
          </div>
        </Link>
        <Link to="/medecin/messagerie">
          <div className="action-card">
            <FaComments className="action-icon" />
            <h3>Messagerie</h3>
            <p>Contacter mes patients</p>
          </div>
        </Link>
        <Link to="/medecin/statistiques">
          <div className="action-card">
            <FaChartBar className="action-icon" />
            <h3>Statistiques</h3>
            <p>Voir mes performances</p>
          </div>
        </Link>
      </div>

      {/* RDV DU JOUR */}
      <div className="rdv-today">
        <h2>📋 Rendez-vous du jour</h2>
        {rdvsAujourdhui.map((rdv) => (
          <div className="rdv-today-item" key={rdv.id}>
            <div className="rdv-patient">
              <h4>{rdv.patient}</h4>
              <p>{rdv.motif}</p>
            </div>
            <span className="rdv-heure">{rdv.heure}</span>
            <button
              className="btn-consulter"
              onClick={() => navigate(`/medecin/consultation/${rdv.id}`)}
            >
              Consulter
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}