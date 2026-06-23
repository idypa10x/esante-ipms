import { Link } from "react-router-dom";
import {
  FaCalendarAlt, FaFileMedical, FaPills,
  FaMapMarkedAlt, FaComments, FaTruck
} from "react-icons/fa";
import "./PatientHome.css";

export default function PatientHome() {
  const rdvs = [
    { id: 1, medecin: "Dr. Diallo", specialite: "Généraliste", date: "25 juin 2026 à 10h00" },
    { id: 2, medecin: "Dr. Ndiaye", specialite: "Cardiologue", date: "28 juin 2026 à 14h30" },
  ];

  return (
    <div className="patient-container">
      <div className="patient-header">
        <h1>Bonjour, <span>Mouhamadou</span> 👋</h1>
        <p>Bienvenue sur votre espace de santé personnel</p>
      </div>

      <div className="patient-cards">
        <Link to="/patient/rdv">
          <div className="patient-card">
            <FaCalendarAlt className="patient-card-icon" />
            <h3>Prendre un RDV</h3>
            <p>Consultez un médecin de l'IPMS</p>
            <div className="card-btn">Réserver</div>
          </div>
        </Link>

        <Link to="/patient/dossier">
          <div className="patient-card">
            <FaFileMedical className="patient-card-icon" />
            <h3>Mon Dossier</h3>
            <p>Consultez votre historique médical</p>
            <div className="card-btn">Voir</div>
          </div>
        </Link>

        <Link to="/patient/ordonnances">
          <div className="patient-card">
            <FaPills className="patient-card-icon" />
            <h3>Ordonnances</h3>
            <p>Vos prescriptions électroniques</p>
            <div className="card-btn">Consulter</div>
          </div>
        </Link>

        <Link to="/carte">
          <div className="patient-card">
            <FaMapMarkedAlt className="patient-card-icon" />
            <h3>Pharmacies</h3>
            <p>Localisez les pharmacies de garde</p>
            <div className="card-btn">Localiser</div>
          </div>
        </Link>

        <Link to="/patient/commande">
          <div className="patient-card">
            <FaTruck className="patient-card-icon" />
            <h3>Commander</h3>
            <p>Commandez vos médicaments</p>
            <div className="card-btn">Commander</div>
          </div>
        </Link>

        <Link to="/patient/messagerie">
          <div className="patient-card">
            <FaComments className="patient-card-icon" />
            <h3>Messagerie</h3>
            <p>Contactez votre médecin</p>
            <div className="card-btn">Ouvrir</div>
          </div>
        </Link>
      </div>

      <div className="section-title">Mes prochains rendez-vous</div>
      <div className="rdv-list">
        {rdvs.map((rdv) => (
          <div className="rdv-item" key={rdv.id}>
            <div className="rdv-info">
              <h4>{rdv.medecin} — {rdv.specialite}</h4>
              <p>{rdv.date}</p>
            </div>
            <span className="rdv-badge">Confirmé</span>
          </div>
        ))}
      </div>
    </div>
  );
}