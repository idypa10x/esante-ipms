import { Link } from "react-router-dom";
import {
  FaUsers, FaUserMd, FaCapsules, FaChartBar,
  FaHospital, FaCog, FaFileMedical, FaShieldAlt
} from "react-icons/fa";
import "./AdminHome.css";

const utilisateursRecents = [
  { id: 1, nom: "Mouhamadou Gueye", email: "mouha@ipms.sn", role: "patient", date: "25 juin 2026" },
  { id: 2, nom: "Dr. Amadou Diallo", email: "diallo@ipms.sn", role: "medecin", date: "24 juin 2026" },
  { id: 3, nom: "Pharmacie Centrale", email: "centrale@ipms.sn", role: "pharmacien", date: "23 juin 2026" },
  { id: 4, nom: "Fatou Diallo", email: "fatou@ipms.sn", role: "patient", date: "22 juin 2026" },
  { id: 5, nom: "Dr. Fatou Ndiaye", email: "ndiaye@ipms.sn", role: "medecin", date: "21 juin 2026" },
];

export default function AdminHome() {
  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Tableau de bord <span>Admin</span> 🛡️</h1>
        <p>Gestion globale de la plateforme e-Santé IPMS</p>
      </div>

      {/* STATS */}
      <div className="admin-stats">
        <div className="admin-stat">
          <FaUsers className="stat-icon" />
          <div className="stat-val">1 248</div>
          <div className="stat-lbl">Utilisateurs total</div>
          <div className="stat-trend">↑ +24 ce mois</div>
        </div>
        <div className="admin-stat">
          <FaUserMd className="stat-icon" />
          <div className="stat-val">38</div>
          <div className="stat-lbl">Médecins actifs</div>
          <div className="stat-trend">↑ +2 ce mois</div>
        </div>
        <div className="admin-stat">
          <FaCapsules className="stat-icon" />
          <div className="stat-val">12</div>
          <div className="stat-lbl">Pharmacies</div>
          <div className="stat-trend">↑ +1 ce mois</div>
        </div>
        <div className="admin-stat">
          <FaFileMedical className="stat-icon" />
          <div className="stat-val">3 847</div>
          <div className="stat-lbl">Ordonnances émises</div>
          <div className="stat-trend">↑ +312 ce mois</div>
        </div>
        <div className="admin-stat">
          <FaChartBar className="stat-icon" />
          <div className="stat-val">892</div>
          <div className="stat-lbl">RDV ce mois</div>
          <div className="stat-trend">↑ +15%</div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="admin-actions">
        <Link to="/admin/utilisateurs">
          <div className="admin-action-card">
            <FaUsers className="action-icon" />
            <h3>Utilisateurs</h3>
            <p>Gérer tous les comptes</p>
          </div>
        </Link>
        <Link to="/admin/medecins">
          <div className="admin-action-card">
            <FaUserMd className="action-icon" />
            <h3>Médecins</h3>
            <p>Valider et gérer les médecins</p>
          </div>
        </Link>
        <Link to="/admin/pharmacies">
          <div className="admin-action-card">
            <FaHospital className="action-icon" />
            <h3>Pharmacies</h3>
            <p>Gérer les pharmacies partenaires</p>
          </div>
        </Link>
        <Link to="/admin/statistiques">
          <div className="admin-action-card">
            <FaChartBar className="action-icon" />
            <h3>Statistiques</h3>
            <p>Rapports et analyses globales</p>
          </div>
        </Link>
        <Link to="/admin/parametres">
          <div className="admin-action-card">
            <FaCog className="action-icon" />
            <h3>Paramètres</h3>
            <p>Configuration de la plateforme</p>
          </div>
        </Link>
        <Link to="/admin/securite">
          <div className="admin-action-card">
            <FaShieldAlt className="action-icon" />
            <h3>Sécurité</h3>
            <p>Logs et accès système</p>
          </div>
        </Link>
      </div>

      {/* UTILISATEURS RECENTS */}
      <div className="admin-recent">
        <h2>👥 Derniers inscrits</h2>
        {utilisateursRecents.map((u) => (
          <div className="admin-user-item" key={u.id}>
            <div className="admin-user-info">
              <h4>{u.nom}</h4>
              <p>{u.email} · {u.date}</p>
            </div>
            <span className={`badge-role ${u.role}`}>
              {u.role === "patient" ? "👤 Patient"
                : u.role === "medecin" ? "👨‍⚕️ Médecin"
                : "💊 Pharmacien"}
            </span>
            <button className="btn-bloquer">🚫 Bloquer</button>
          </div>
        ))}
      </div>
    </div>
  );
}