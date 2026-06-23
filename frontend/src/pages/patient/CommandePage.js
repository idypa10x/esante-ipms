import { useState } from "react";
import { FaPills } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./CommandePage.css";

const medicaments = [
  { id: 1, nom: "Paracétamol 500mg", description: "Antidouleur et antipyrétique", prix: 500 },
  { id: 2, nom: "Amoxicilline 1g", description: "Antibiotique (ordonnance requise)", prix: 2500 },
  { id: 3, nom: "Ibuprofène 400mg", description: "Anti-inflammatoire", prix: 800 },
  { id: 4, nom: "Doliprane 1000mg", description: "Antidouleur adulte", prix: 600 },
  { id: 5, nom: "Vitamine C 500mg", description: "Complément alimentaire", prix: 300 },
];

export default function CommandePage() {
  const [quantites, setQuantites] = useState({});
  const [paiement, setPaiement] = useState("orange");
  const navigate = useNavigate();

  const updateQty = (id, delta) => {
    setQuantites((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const panier = medicaments.filter((m) => quantites[m.id] > 0);
  const total = panier.reduce((sum, m) => sum + m.prix * quantites[m.id], 0);

  const handleCommander = () => {
    alert(`Commande confirmée ! Paiement via ${paiement === "orange" ? "Orange Money" : "Wave"}`);
    navigate("/patient");
  };

  return (
    <div className="commande-container">
      <h1>Commander des <span>médicaments</span></h1>
      <p>Sélectionnez vos médicaments et payez en ligne</p>

      <div className="commande-grid">
        <div className="medicaments-list">
          {medicaments.map((m) => (
            <div className="medicament-card" key={m.id}>
              <FaPills className="medicament-icon" />
              <div className="medicament-info">
                <h3>{m.nom}</h3>
                <p>{m.description}</p>
              </div>
              <div className="medicament-qty">
                <button className="qty-btn" onClick={() => updateQty(m.id, -1)}>−</button>
                <span className="qty-value">{quantites[m.id] || 0}</span>
                <button className="qty-btn" onClick={() => updateQty(m.id, 1)}>+</button>
              </div>
              <div className="medicament-prix">{m.prix} F</div>
            </div>
          ))}
        </div>

        <div className="panier">
          <h2>🛒 Mon panier</h2>
          {panier.length === 0 ? (
            <p style={{ color: "var(--gris)", fontSize: "13px" }}>Aucun médicament sélectionné</p>
          ) : (
            panier.map((m) => (
              <div className="panier-item" key={m.id}>
                <span>{m.nom} x{quantites[m.id]}</span>
                <span>{m.prix * quantites[m.id]} F</span>
              </div>
            ))
          )}

          <div className="panier-total">
            <span>Total</span>
            <span>{total} F CFA</span>
          </div>

          <div className="paiement-section">
            <p>Mode de paiement</p>
            <div className="paiement-btns">
              <button
                className={`paiement-btn ${paiement === "orange" ? "active" : ""}`}
                onClick={() => setPaiement("orange")}
              >
                🟠 Orange Money
              </button>
              <button
                className={`paiement-btn ${paiement === "wave" ? "active" : ""}`}
                onClick={() => setPaiement("wave")}
              >
                🔵 Wave
              </button>
            </div>
          </div>

          <button
            className="commander-btn"
            disabled={panier.length === 0}
            onClick={handleCommander}
          >
            Confirmer la commande
          </button>
        </div>
      </div>
    </div>
  );
}