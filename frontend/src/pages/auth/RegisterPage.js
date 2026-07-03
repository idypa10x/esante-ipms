import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserMd, FaUser, FaCapsules, FaHeartbeat } from "react-icons/fa";
import api from "../../services/api";
import "./RegisterPage.css";

export default function RegisterPage() {
  const [role, setRole] = useState("patient");
  const [form, setForm] = useState({
    prenom: "", nom: "", email: "", password: "", password_confirmation: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/register", {
        name: `${form.prenom} ${form.nom}`,
        email: form.email,
        password: form.password,
        password_confirmation: form.password,
        role: role,
        specialite: role === "medecin" ? form.specialite || "Généraliste" : undefined,
        numero_ordre: role === "medecin" ? form.numero_ordre || "ORD-000" : undefined,
        date_naissance: role === "patient" ? form.date_naissance || null : undefined,
        telephone: form.telephone || null,
        matricule: role === "pharmacien" ? form.matricule || "MAT-000" : undefined,
        numero_licence: role === "pharmacien" ? form.numero_licence || "LIC-000" : undefined,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);

      // Récupère le rôle via /me
      const meRes = await api.get("/me");
      const userRole = meRes.data.role;

      const fullUser = { ...user, role: userRole };
      localStorage.setItem("user", JSON.stringify(fullUser));

      if (userRole === "patient") navigate("/patient");
      else if (userRole === "medecin") navigate("/medecin");
      else if (userRole === "pharmacien") navigate("/pharmacien");
      else navigate("/");

    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        const firstError = Object.values(errors)[0][0];
        setError(firstError);
      } else {
        setError(err.response?.data?.message || "Erreur lors de l'inscription");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="register-container">
      <div className="register-card">
        <FaHeartbeat size={36} color="#00C96B" style={{ marginBottom: "16px" }} />
        <h2>Créer un compte <span>e-Santé</span></h2>
        <p>Rejoignez la plateforme de santé numérique de l'IPMS</p>

        {error && (
          <div style={{
            background: "#FFE8E8", color: "#CC0000",
            padding: "12px 16px", borderRadius: 10,
            fontSize: 13, fontWeight: 600, marginBottom: 16
          }}>
            ❌ {error}
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label>Prénom</label>
            <input type="text" name="prenom" placeholder="Mouhamadou"
              value={form.prenom} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Nom</label>
            <input type="text" name="nom" placeholder="Gueye"
              value={form.nom} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" placeholder="exemple@ipms.sn"
            value={form.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Mot de passe</label>
          <input type="password" name="password" placeholder="••••••••"
            value={form.password} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Je suis un(e)</label>
          <div className="role-selector">
            <button className={`role-btn ${role === "patient" ? "active" : ""}`}
              onClick={() => setRole("patient")}>
              <FaUser /> Patient
            </button>
            <button className={`role-btn ${role === "medecin" ? "active" : ""}`}
              onClick={() => setRole("medecin")}>
              <FaUserMd /> Médecin
            </button>
            <button className={`role-btn ${role === "pharmacien" ? "active" : ""}`}
              onClick={() => setRole("pharmacien")}>
              <FaCapsules /> Pharmacien
            </button>
          </div>
        </div>

        <button className="register-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Inscription en cours..." : "Créer mon compte"}
        </button>

        <div className="register-footer">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </div>
      </div>
    </div>
  );
}