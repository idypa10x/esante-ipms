import { Link } from "react-router-dom";
import { FaHeartbeat, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* BRAND */}
        <div className="footer-brand">
          <h2>
            <FaHeartbeat style={{ marginRight: 8, color: "#00FF87" }} />
            <span>e-Santé</span> IPMS
          </h2>
          <p>
            Plateforme de santé numérique de l'Institut de Prévoyance
            Maladie du Sénégal. Accédez à vos soins en quelques clics.
          </p>
          <div className="footer-socials">
            <div className="social-btn"><FaFacebook /></div>
            <div className="social-btn"><FaTwitter /></div>
            <div className="social-btn"><FaLinkedin /></div>
          </div>
        </div>

        {/* SERVICES */}
        <div className="footer-col">
          <h3>Services</h3>
          <ul>
            <li><Link to="/patient/rdv">Prendre un RDV</Link></li>
            <li><Link to="/carte">Pharmacies de garde</Link></li>
            <li><Link to="/recherche-medicament">Médicaments</Link></li>
            <li><Link to="/patient/ordonnances">Ordonnances</Link></li>
            <li><Link to="/patient/commande">Commander</Link></li>
          </ul>
        </div>

        {/* ESPACES */}
        <div className="footer-col">
          <h3>Espaces</h3>
          <ul>
            <li><Link to="/patient">Espace Patient</Link></li>
            <li><Link to="/medecin">Espace Médecin</Link></li>
            <li><Link to="/pharmacien">Espace Pharmacien</Link></li>
            <li><Link to="/admin">Espace Admin</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-col">
          <h3>Contact</h3>
          <ul>
            <li><a href="mailto:contact@ipms.sn">contact@ipms.sn</a></li>
            <li><a href="tel:+221338234567">+221 33 823 45 67</a></li>
            <li><a href="#">Avenue Bourguiba, Dakar</a></li>
            <li><Link to="/login">Connexion</Link></li>
            <li><Link to="/register">Inscription</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 e-Santé IPMS · Tous droits réservés</span>
        <span>Fait avec ❤️ pour la santé au Sénégal</span>
      </div>
    </footer>
  );
}