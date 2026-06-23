import { Link } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <FaHeartbeat className="logo-icon" color="#00C96B" />
        <span>e-Santé</span> IPMS
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/carte">Pharmacies</Link></li>
        <li><Link to="/recherche-medicament">Médicaments</Link></li>
      </ul>
      <Link to="/login">
        <button className="navbar-btn">Connexion</button>
      </Link>
    </nav>
  );
}