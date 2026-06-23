import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserMd, FaUser, FaCapsules } from "react-icons/fa";
import { FaHeartbeat } from "react-icons/fa";
import "./RegisterPage.css";

export default function RegisterPage() {
  const [role, setRole] = useState("patient");
  const [form, setForm] = useState({
    prenom: "", nom: "", email: "", password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inscription :", { ...form, role });
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <FaHeartbeat size={36} color="#00C96B" style={{ marginBottom: "16px" }} />
        <h2>Créer un compte <span>e-Santé</span></h2>
        <p>Rejoignez la plateforme de santé numérique de l'IPMS</p>

        <div className="form-row">
          <div className="form-group">
            <label>Prénom</label>
            <input
              type="text"
              name="prenom"
              placeholder="Mouhamadou"
              value={form.prenom}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              name="nom"
              placeholder="Gueye"
              value={form.nom}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="exemple@ipms.sn"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Je suis un(e)</label>
          <div className="role-selector">
            <button
              className={`role-btn ${role === "patient" ? "active" : ""}`}
              onClick={() => setRole("patient")}
            >
              <FaUser /> Patient
            </button>
            <button
              className={`role-btn ${role === "medecin" ? "active" : ""}`}
              onClick={() => setRole("medecin")}
            >
              <FaUserMd /> Médecin
            </button>
            <button
              className={`role-btn ${role === "pharmacien" ? "active" : ""}`}
              onClick={() => setRole("pharmacien")}
            >
              <FaCapsules /> Pharmacien
            </button>
          </div>
        </div>

        <button className="register-btn" onClick={handleSubmit}>
          Créer mon compte
        </button>

        <div className="register-footer">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </div>
      </div>
    </div>
  );
}