import { Link } from "react-router-dom";
import { FaUserMd, FaPills, FaMapMarkedAlt, FaFileMedical } from "react-icons/fa";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <h1>
          La santé numérique <br />
          <span>au service de l'IPMS</span>
        </h1>
        <p>
          Prenez rendez-vous, consultez vos ordonnances, 
          localisez les pharmacies de garde et commandez 
          vos médicaments en ligne.
        </p>
        <div className="hero-btns">
          <Link to="/register">
            <button className="btn-primary">Commencer</button>
          </Link>
          <Link to="/carte">
            <button className="btn-secondary">Voir les pharmacies</button>
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature-card">
          <FaUserMd className="feature-icon" />
          <h3>Consulter un médecin</h3>
          <p>Prenez rendez-vous en ligne avec les médecins de l'IPMS en quelques clics.</p>
        </div>
        <div className="feature-card">
          <FaFileMedical className="feature-icon" />
          <h3>Ordonnances électroniques</h3>
          <p>Recevez et consultez vos ordonnances directement sur la plateforme.</p>
        </div>
        <div className="feature-card">
          <FaMapMarkedAlt className="feature-icon" />
          <h3>Pharmacies de garde</h3>
          <p>Localisez en temps réel les pharmacies ouvertes et de garde près de vous.</p>
        </div>
        <div className="feature-card">
          <FaPills className="feature-icon" />
          <h3>Commande & Livraison</h3>
          <p>Commandez vos médicaments en ligne et faites-vous livrer à domicile.</p>
        </div>
      </section>
    </div>
  );
}