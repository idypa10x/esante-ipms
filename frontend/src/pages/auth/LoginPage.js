import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";
import api from "../../services/api";
import "./LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/login", { email, password });
      const { token, user } = res.data;

      // Sauvegarde le token d'abord
      localStorage.setItem("token", token);

      // Récupère le rôle via /me
      const meRes = await api.get("/me");
      const role = meRes.data.role;

      const fullUser = { ...user, role };
      localStorage.setItem("user", JSON.stringify(fullUser));

      if (role === "patient") navigate("/patient");
      else if (role === "medecin") navigate("/medecin");
      else if (role === "pharmacien") navigate("/pharmacien");
      else if (role === "administrateur") navigate("/admin");
      else navigate("/");

    } catch (err) {
      setError(err.response?.data?.message || "Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <FaHeartbeat size={36} color="#00C96B" style={{ marginBottom: "16px" }} />
        <h2>Bon retour sur <span>e-Santé</span></h2>
        <p>Connectez-vous pour accéder à votre espace de santé</p>

        {error && (
          <div style={{
            background: "#FFE8E8", color: "#CC0000",
            padding: "12px 16px", borderRadius: 10,
            fontSize: 13, fontWeight: 600, marginBottom: 16
          }}>
            ❌ {error}
          </div>
        )}

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
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>

        <button className="login-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Connexion en cours..." : "Se connecter"}
        </button>

        <div className="login-footer">
          Pas encore de compte ? <Link to="/register">S'inscrire</Link>
        </div>
      </div>
    </div>
  );
}