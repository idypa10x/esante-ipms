import { useState } from "react";
import { FaSearch, FaPlus, FaPills } from "react-icons/fa";
import "./StockPage.css";

const stockInitial = [
  { id: 1, nom: "Paracétamol 500mg", categorie: "Antidouleur", quantite: 450, seuil: 50, prix: 500, expiration: "12/2027" },
  { id: 2, nom: "Amoxicilline 1g", categorie: "Antibiotique", quantite: 30, seuil: 50, prix: 2500, expiration: "06/2026" },
  { id: 3, nom: "Ibuprofène 400mg", categorie: "Anti-inflammatoire", quantite: 0, seuil: 30, prix: 800, expiration: "09/2027" },
  { id: 4, nom: "Amlodipine 5mg", categorie: "Cardiologie", quantite: 120, seuil: 20, prix: 1500, expiration: "03/2028" },
  { id: 5, nom: "Doliprane 1000mg", categorie: "Antidouleur", quantite: 15, seuil: 40, prix: 600, expiration: "11/2027" },
  { id: 6, nom: "Vitamine C 500mg", categorie: "Complément", quantite: 200, seuil: 30, prix: 300, expiration: "08/2028" },
  { id: 7, nom: "Zinc 10mg", categorie: "Complément", quantite: 85, seuil: 20, prix: 400, expiration: "05/2027" },
  { id: 8, nom: "Aspirine 100mg", categorie: "Cardiologie", quantite: 60, seuil: 25, prix: 350, expiration: "01/2028" },
];

function getStatut(quantite, seuil) {
  if (quantite === 0) return "rupture";
  if (quantite < seuil) return "faible";
  return "ok";
}

function getLabelStatut(statut) {
  if (statut === "rupture") return "⛔ Rupture";
  if (statut === "faible") return "⚠️ Faible";
  return "✅ OK";
}

export default function StockPage() {
  const [stock, setStock] = useState(stockInitial);
  const [recherche, setRecherche] = useState("");
  const [editId, setEditId] = useState(null);
  const [editQty, setEditQty] = useState("");

  const stockFiltre = stock.filter((s) =>
    s.nom.toLowerCase().includes(recherche.toLowerCase()) ||
    s.categorie.toLowerCase().includes(recherche.toLowerCase())
  );

  const handleModifier = (id, quantiteActuelle) => {
    setEditId(id);
    setEditQty(quantiteActuelle);
  };

  const handleSauvegarder = (id) => {
    setStock(stock.map((s) =>
      s.id === id ? { ...s, quantite: parseInt(editQty) || 0 } : s
    ));
    setEditId(null);
  };

  return (
    <div className="stock-container">
      <h1>Gestion du <span>Stock</span></h1>
      <p>Suivez et mettez à jour vos médicaments disponibles</p>

      <div className="stock-toolbar">
        <div className="stock-search">
          <FaSearch color="#00C96B" />
          <input
            type="text"
            placeholder="Rechercher un médicament..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
        </div>
        <button className="btn-ajouter-stock">
          <FaPlus /> Ajouter un médicament
        </button>
      </div>

      <div className="stock-table">
        <table>
          <thead>
            <tr>
              <th>💊 Médicament</th>
              <th>Catégorie</th>
              <th>Quantité</th>
              <th>Prix unitaire</th>
              <th>Expiration</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stockFiltre.map((s) => {
              const statut = getStatut(s.quantite, s.seuil);
              return (
                <tr key={s.id}>
                  <td style={{ fontWeight: 700 }}>
                    <FaPills color="#00C96B" style={{ marginRight: 8 }} />
                    {s.nom}
                  </td>
                  <td>{s.categorie}</td>
                  <td>
                    {editId === s.id ? (
                      <input
                        type="number"
                        value={editQty}
                        onChange={(e) => setEditQty(e.target.value)}
                        style={{
                          width: 70, padding: "4px 8px",
                          border: "2px solid var(--vert)",
                          borderRadius: 8, outline: "none", fontSize: 13
                        }}
                      />
                    ) : (
                      s.quantite
                    )}
                  </td>
                  <td>{s.prix} F CFA</td>
                  <td>{s.expiration}</td>
                  <td>
                    <span className={`badge-stock ${statut}`}>
                      {getLabelStatut(statut)}
                    </span>
                  </td>
                  <td>
                    {editId === s.id ? (
                      <button
                        className="btn-modifier"
                        onClick={() => handleSauvegarder(s.id)}
                        style={{ backgroundColor: "var(--vert)" }}
                      >
                        ✅ Sauver
                      </button>
                    ) : (
                      <button
                        className="btn-modifier"
                        onClick={() => handleModifier(s.id, s.quantite)}
                      >
                        ✏️ Modifier
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}