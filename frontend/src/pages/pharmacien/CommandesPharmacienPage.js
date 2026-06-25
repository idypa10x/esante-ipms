import { useState } from "react";
import { FaPills } from "react-icons/fa";
import "./CommandesPharmacienPage.css";

const commandesData = [
  {
    id: 1,
    patient: "Mouhamadou Gueye",
    adresse: "Liberté 6, Dakar",
    date: "25 juin 2026",
    statut: "en-attente",
    paiement: "Orange Money",
    total: 3800,
    medicaments: ["Paracétamol 500mg x2", "Amoxicilline 1g x1", "Ibuprofène 400mg x1"],
  },
  {
    id: 2,
    patient: "Fatou Diallo",
    adresse: "Sacré-Cœur 3, Dakar",
    date: "25 juin 2026",
    statut: "en-preparation",
    paiement: "Wave",
    total: 1800,
    medicaments: ["Amlodipine 5mg x1", "Aspirine 100mg x2"],
  },
  {
    id: 3,
    patient: "Ibrahima Sow",
    adresse: "Mermoz, Dakar",
    date: "24 juin 2026",
    statut: "livree",
    paiement: "Orange Money",
    total: 900,
    medicaments: ["Vitamine C 500mg x1", "Zinc 10mg x1"],
  },
  {
    id: 4,
    patient: "Aïssatou Ndiaye",
    adresse: "Plateau, Dakar",
    date: "24 juin 2026",
    statut: "en-attente",
    paiement: "Wave",
    total: 2500,
    medicaments: ["Amoxicilline 1g x1"],
  },
];

const labelStatut = {
  "en-attente": "⏳ En attente",
  "en-preparation": "🔄 En préparation",
  "livree": "✅ Livrée",
};

export default function CommandesPharmacienPage() {
  const [onglet, setOnglet] = useState("toutes");
  const [commandes, setCommandes] = useState(commandesData);

  const commandesFiltrees = commandes.filter((c) => {
    if (onglet === "toutes") return true;
    return c.statut === onglet;
  });

  const handlePreparer = (id) => {
    setCommandes(commandes.map((c) =>
      c.id === id
        ? { ...c, statut: c.statut === "en-attente" ? "en-preparation" : "livree" }
        : c
    ));
  };

  return (
    <div className="commandes-pharmacien-container">
      <h1>Commandes <span>en ligne</span></h1>
      <p>Gérez les commandes de médicaments passées par les patients</p>

      <div className="commandes-tabs">
        <button
          className={`tab-btn ${onglet === "toutes" ? "active" : ""}`}
          onClick={() => setOnglet("toutes")}
        >
          🏥 Toutes ({commandes.length})
        </button>
        <button
          className={`tab-btn ${onglet === "en-attente" ? "active" : ""}`}
          onClick={() => setOnglet("en-attente")}
        >
          ⏳ En attente ({commandes.filter(c => c.statut === "en-attente").length})
        </button>
        <button
          className={`tab-btn ${onglet === "en-preparation" ? "active" : ""}`}
          onClick={() => setOnglet("en-preparation")}
        >
          🔄 En préparation ({commandes.filter(c => c.statut === "en-preparation").length})
        </button>
        <button
          className={`tab-btn ${onglet === "livree" ? "active" : ""}`}
          onClick={() => setOnglet("livree")}
        >
          ✅ Livrées ({commandes.filter(c => c.statut === "livree").length})
        </button>
      </div>

      <div className="commandes-list">
        {commandesFiltrees.map((c) => (
          <div className="commande-card-pharmacien" key={c.id}>
            <div className="commande-card-pharmacien-info">
              <h3>👤 {c.patient}</h3>
              <p>📍 {c.adresse}</p>
              <p>📅 {c.date} · 💳 {c.paiement}</p>
              <div className="commande-medicaments-tags">
                {c.medicaments.map((m, i) => (
                  <span key={i} className="commande-med-tag">
                    <FaPills style={{ marginRight: 4 }} />{m}
                  </span>
                ))}
              </div>
            </div>
            <div className="commande-card-pharmacien-actions">
              <span className={`badge-commande ${c.statut}`}>
                {labelStatut[c.statut]}
              </span>
              <div className="commande-total">{c.total} F CFA</div>
              {c.statut !== "livree" && (
                <button
                  className="btn-preparer"
                  onClick={() => handlePreparer(c.id)}
                >
                  {c.statut === "en-attente" ? "🔄 Préparer" : "✅ Marquer livrée"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}