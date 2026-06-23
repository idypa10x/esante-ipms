import { FaFileMedical, FaPills } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./OrdonnancesPage.css";

const ordonnances = [
  {
    id: 1,
    medecin: "Dr. Amadou Diallo",
    specialite: "Médecin Généraliste",
    date: "15 juin 2026",
    statut: "en-attente",
    medicaments: ["Paracétamol 500mg", "Amoxicilline 1g", "Ibuprofène 400mg"],
  },
  {
    id: 2,
    medecin: "Dr. Fatou Ndiaye",
    specialite: "Cardiologue",
    date: "10 juin 2026",
    statut: "delivree",
    medicaments: ["Amlodipine 5mg", "Aspirine 100mg"],
  },
  {
    id: 3,
    medecin: "Dr. Ibrahima Sow",
    specialite: "Pédiatre",
    date: "5 juin 2026",
    statut: "delivree",
    medicaments: ["Doliprane 250mg", "Zinc 10mg", "Vitamine C"],
  },
];

export default function OrdonnancesPage() {
  const navigate = useNavigate();

  return (
    <div className="ordonnances-container">
      <h1>Mes <span>Ordonnances</span></h1>
      <p>Consultez et commandez vos prescriptions électroniques</p>

      <div className="ordonnances-list">
        {ordonnances.map((o) => (
          <div className="ordonnance-card" key={o.id}>
            <div className="ordonnance-info">
              <h3>
                <FaFileMedical color="#00C96B" style={{ marginRight: 8 }} />
                {o.medecin} — {o.specialite}
              </h3>
              <p>Prescrite le {o.date}</p>
              <div className="ordonnance-medicaments">
                {o.medicaments.map((m, i) => (
                  <span key={i} className="med-tag">
                    <FaPills style={{ marginRight: 4 }} />
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <div className="ordonnance-actions">
              <span className={`badge-statut ${o.statut}`}>
                {o.statut === "delivree" ? "✅ Délivrée" : "⏳ En attente"}
              </span>
              {o.statut === "en-attente" && (
                <button
                  className="btn-commander"
                  onClick={() => navigate("/patient/commande")}
                >
                  Commander
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}