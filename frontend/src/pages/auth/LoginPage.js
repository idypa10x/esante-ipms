import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";
import "./LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Connexion avec :", email, password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <FaHeartbeat size={36} color="#00C96B" style={{ marginBottom: "16px" }} />
        <h2>Bon retour sur <span>e-Santé</span></h2>
        <p>Connectez-vous pour accéder à votre espace de santé</p>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="exemple@ipms.sn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={handleSubmit}>
          Se connecter
        </button>

        <div className="login-footer">
          Pas encore de compte ? <Link to="/register">S'inscrire</Link>
        </div>
      </div>
    </div>
  );
}