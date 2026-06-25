import { useState } from "react";
import { FaFileMedical, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./OrdonnancePage.css";

const patients = [
  { id: 1, nom: "Mouhamadou Gueye" },
  { id: 2, nom: "Fatou Diallo" },
  { id: 3, nom: "Ibrahima Sow" },
  { id: 4, nom: "Aïssatou Ndiaye" },
];

export default function OrdonnancePage() {
  const [patientId, setPatientId] = useState("");
  const [medicaments, setMedicaments] = useState([
    { nom: "", dosage: "", duree: "" },
  ]);
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const addMedicament = () => {
    setMedicaments([...medicaments, { nom: "", dosage: "", duree: "" }]);
  };

  const removeMedicament = (index) => {
    setMedicaments(medicaments.filter((_, i) => i !== index));
  };

  const updateMedicament = (index, field, value) => {
    const updated = [...medicaments];
    updated[index][field] = value;
    setMedicaments(updated);
  };

  const handleEnvoyer = () => {
    alert("Ordonnance envoyée au patient et au pharmacien !");
    navigate("/medecin");
  };

  return (
    <div className="ordonnance-container">
      <h1>Rédiger une <span>Ordonnance</span></h1>
      <p>Prescrivez des médicaments à votre patient</p>

      <div className="ordonnance-form">
        <div className="ordonnance-entete">
          <div>
            <h3>
              <FaFileMedical style={{ marginRight: 8 }} />
              Dr. Amadou Diallo — Médecin Généraliste
            </h3>
            <p>IPMS · {new Date().toLocaleDateString("fr-FR")}</p>
          </div>
        </div>

        <select
          className="select-patient"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        >
          <option value="">-- Sélectionner un patient --</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>{p.nom}</option>
          ))}
        </select>

        <div className="medicaments-section">
          <h3>💊 Médicaments prescrits</h3>
          {medicaments.map((m, i) => (
            <div className="medicament-row" key={i}>
              <input
                placeholder="Nom du médicament"
                value={m.nom}
                onChange={(e) => updateMedicament(i, "nom", e.target.value)}
              />
              <input
                placeholder="Dosage (ex: 500mg)"
                value={m.dosage}
                onChange={(e) => updateMedicament(i, "dosage", e.target.value)}
              />
              <input
                placeholder="Durée (ex: 7 jours)"
                value={m.duree}
                onChange={(e) => updateMedicament(i, "duree", e.target.value)}
              />
              {medicaments.length > 1 && (
                <button className="btn-remove" onClick={() => removeMedicament(i)}>×</button>
              )}
            </div>
          ))}
          <button className="btn-add-med" onClick={addMedicament}>
            <FaPlus style={{ marginRight: 6 }} />
            Ajouter un médicament
          </button>
        </div>

        <div className="notes-section">
          <label>Notes cliniques</label>
          <textarea
            placeholder="Observations, recommandations, posologie..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button className="btn-envoyer" onClick={handleEnvoyer}>
          Envoyer l'ordonnance
        </button>
      </div>
    </div>
  );
}