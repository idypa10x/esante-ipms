import { Link, useNavigate } from "react-router-dom";
import { FaHeartbeat, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const getDashboardLink = () => {
    if (!user) return "/";
    if (user.role === "patient") return "/patient";
    if (user.role === "medecin") return "/medecin";
    if (user.role === "pharmacien") return "/pharmacien";
    if (user.role === "administrateur") return "/admin";
    return "/";
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <FaHeartbeat className="logo-icon" color="#00C96B" />
        <Link to="/"><span>e-Santé</span> IPMS</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/carte">Pharmacies</Link></li>
        <li><Link to="/recherche-medicament">Médicaments</Link></li>
      </ul>

      {user ? (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link to={getDashboardLink()} style={{
            display: "flex", alignItems: "center", gap: 8,
            fontSize: 14, fontWeight: 600, color: "var(--texte)"
          }}>
            <FaUserCircle color="#00C96B" size={22} />
            {user.name}
          </Link>
          <button
            onClick={handleLogout}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "10px 18px", borderRadius: 25,
              backgroundColor: "#FFE8E8", color: "#CC0000",
              fontWeight: 700, fontSize: 13, border: "none",
              cursor: "pointer", transition: "all 0.2s"
            }}
          >
            <FaSignOutAlt /> Déconnexion
          </button>
        </div>
      ) : (
        <Link to="/login">
          <button className="navbar-btn">Connexion</button>
        </Link>
      )}
    </nav>
  );
}