import { useState } from "react";
import { FaSearch, FaPills } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./RechercheMedicamentPage.css";

const medicamentsData = [
  { id: 1, nom: "Paracétamol 500mg", categorie: "Antidouleur", description: "Antidouleur et antipyrétique pour adultes et enfants.", prix: 500, disponible: true },
  { id: 2, nom: "Amoxicilline 1g", categorie: "Antibiotique", description: "Antibiotique à large spectre. Ordonnance obligatoire.", prix: 2500, disponible: true },
  { id: 3, nom: "Ibuprofène 400mg", categorie: "Anti-inflammatoire", description: "Anti-inflammatoire non stéroïdien pour douleurs et fièvre.", prix: 800, disponible: false },
  { id: 4, nom: "Amlodipine 5mg", categorie: "Cardiologie", description: "Traitement de l'hypertension artérielle et de l'angine.", prix: 1500, disponible: true },
  { id: 5, nom: "Doliprane 1000mg", categorie: "Antidouleur", description: "Antidouleur puissant pour adultes.", prix: 600, disponible: true },
  { id: 6, nom: "Vitamine C 500mg", categorie: "Complément", description: "Renforcement du système immunitaire.", prix: 300, disponible: true },
  { id: 7, nom: "Zinc 10mg", categorie: "Complément", description: "Complément alimentaire pour la croissance et l'immunité.", prix: 400, disponible: true },
  { id: 8, nom: "Aspirine 100mg", categorie: "Cardiologie", description: "Traitement préventif des maladies cardiovasculaires.", prix: 350, disponible: true },
  { id: 9, nom: "Metformine 500mg", categorie: "Diabétologie", description: "Traitement du diabète de type 2.", prix: 1200, disponible: true },
  { id: 10, nom: "Oméprazole 20mg", categorie: "Gastro-entérologie", description: "Traitement des ulcères et reflux gastro-oesophagien.", prix: 900, disponible: false },
  { id: 11, nom: "Salbutamol 100mcg", categorie: "Pneumologie", description: "Bronchodilatateur pour l'asthme et la BPCO.", prix: 3500, disponible: true },
  { id: 12, nom: "Loratadine 10mg", categorie: "Allergie", description: "Antihistaminique pour les allergies saisonnières.", prix: 700, disponible: true },
];

const categories = ["Toutes", "Antidouleur", "Antibiotique", "Anti-inflammatoire", "Cardiologie", "Complément", "Diabétologie", "Gastro-entérologie", "Pneumologie", "Allergie"];

export default function RechercheMedicamentPage() {
  const [recherche, setRecherche] = useState("");
  const [categorie, setCategorie] = useState("Toutes");
  const navigate = useNavigate();

  const medicamentsFiltres = medicamentsData.filter((m) => {
    const matchRecherche = m.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      m.description.toLowerCase().includes(recherche.toLowerCase());
    const matchCategorie = categorie === "Toutes" || m.categorie === categorie;
    return matchRecherche && matchCategorie;
  });

  return (
    <div className="recherche-container">
      <h1>Recherche de <span>Médicaments</span></h1>
      <p>Trouvez vos médicaments et commandez-les en ligne</p>

      <div className="recherche-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Rechercher un médicament, une molécule..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
      </div>

      <div className="categories-bar">
        {categories.map((c) => (
          <button
            key={c}
            className={`cat-btn ${categorie === c ? "active" : ""}`}
            onClick={() => setCategorie(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {medicamentsFiltres.length === 0 ? (
        <div className="aucun-resultat">
          <FaPills size={48} color="#E0E0E0" />
          <p style={{ marginTop: 16 }}>Aucun médicament trouvé pour "{recherche}"</p>
        </div>
      ) : (
        <div className="medicaments-grid">
          {medicamentsFiltres.map((m) => (
            <div className="medicament-item" key={m.id}>
              <div className="medicament-item-header">
                <h3>
                  <FaPills color="#00C96B" style={{ marginRight: 8 }} />
                  {m.nom}
                </h3>
                <span className="med-categorie-badge">{m.categorie}</span>
              </div>
              <p>{m.description}</p>
              <div className="medicament-item-footer">
                <span className="med-prix">{m.prix} F CFA</span>
                <span className={`med-dispo ${m.disponible ? "disponible" : "indisponible"}`}>
                  {m.disponible ? "✅ Disponible" : "❌ Indisponible"}
                </span>
              </div>
              <button
                className="btn-commander-med"
                disabled={!m.disponible}
                onClick={() => navigate("/patient/commande")}
              >
                {m.disponible ? "🛒 Commander" : "Indisponible"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}