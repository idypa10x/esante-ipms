import { useState } from "react";
import { FaUser, FaPaperPlane, FaUserMd } from "react-icons/fa";
import "./MessageriePharmacienPage.css";
import "../medecin/MessagerieMedecinPage.css";

const conversations = [
  {
    id: 1,
    nom: "Dr. Amadou Diallo",
    type: "medecin",
    dernierMsg: "Le patient viendra chercher son ordonnance ce soir",
    heure: "11:30",
    messages: [
      { texte: "Bonjour, j'ai envoyé une ordonnance pour Mouhamadou Gueye", type: "recu" },
      { texte: "Bien reçu docteur, on prépare ça", type: "envoye" },
      { texte: "Le patient viendra chercher son ordonnance ce soir", type: "recu" },
    ],
  },
  {
    id: 2,
    nom: "Mouhamadou Gueye",
    type: "patient",
    dernierMsg: "Merci, je passe dans 30 minutes",
    heure: "10:15",
    messages: [
      { texte: "Bonjour, est-ce que mon Amoxicilline est disponible ?", type: "recu" },
      { texte: "Oui il est en stock, vous pouvez passer", type: "envoye" },
      { texte: "Merci, je passe dans 30 minutes", type: "recu" },
    ],
  },
  {
    id: 3,
    nom: "Dr. Fatou Ndiaye",
    type: "medecin",
    dernierMsg: "Merci pour la confirmation",
    heure: "09:00",
    messages: [
      { texte: "Avez-vous de l'Amlodipine 5mg en stock ?", type: "recu" },
      { texte: "Oui nous en avons 120 unités", type: "envoye" },
      { texte: "Merci pour la confirmation", type: "recu" },
    ],
  },
];

export default function MessageriePharmacienPage() {
  const [convActive, setConvActive] = useState(conversations[0]);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") return;
    convActive.messages.push({ texte: message, type: "envoye" });
    setMessage("");
  };

  return (
    <div className="messagerie-pharmacien-container">
      <h1>Ma <span>Messagerie</span></h1>
      <p>Communiquez avec médecins et patients</p>

      <div className="messagerie-layout">
        <div className="conversations-list">
          {conversations.map((c) => (
            <div
              key={c.id}
              className={`conversation-item ${convActive.id === c.id ? "active" : ""}`}
              onClick={() => setConvActive(c)}
            >
              <div className="conv-avatar">
                {c.type === "medecin"
                  ? <FaUserMd color="#00C96B" />
                  : <FaUser color="#00C96B" />
                }
              </div>
              <div className="conv-info">
                <h4>{c.nom}</h4>
                <p>{c.dernierMsg}</p>
              </div>
              <span className="conv-time">{c.heure}</span>
            </div>
          ))}
        </div>

        <div className="chat-zone">
          <div className="chat-header">
            <div className="conv-avatar">
              {convActive.type === "medecin"
                ? <FaUserMd color="#00C96B" />
                : <FaUser color="#00C96B" />
              }
            </div>
            <h3>{convActive.nom}</h3>
          </div>

          <div className="chat-messages">
            {convActive.messages.map((m, i) => (
              <div key={i} className={`msg-bubble ${m.type}`}>
                {m.texte}
              </div>
            ))}
          </div>

          <div className="chat-input-zone">
            <input
              type="text"
              placeholder="Écrire un message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button className="btn-send" onClick={handleSend}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}