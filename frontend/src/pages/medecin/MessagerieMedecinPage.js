import { useState } from "react";
import { FaUser, FaPaperPlane } from "react-icons/fa";
import "./MessagerieMedecinPage.css";

const conversations = [
  {
    id: 1,
    nom: "Mouhamadou Gueye",
    dernierMsg: "Merci docteur, je passe à la pharmacie",
    heure: "10:24",
    messages: [
      { texte: "Bonjour docteur, j'ai encore un peu de fièvre", type: "recu" },
      { texte: "Avez-vous bien pris le traitement prescrit ?", type: "envoye" },
      { texte: "Oui depuis 2 jours", type: "recu" },
      { texte: "Continuez encore 3 jours, ça devrait passer", type: "envoye" },
      { texte: "Merci docteur, je passe à la pharmacie", type: "recu" },
    ],
  },
  {
    id: 2,
    nom: "Fatou Diallo",
    dernierMsg: "D'accord, à jeudi alors",
    heure: "09:10",
    messages: [
      { texte: "Bonjour, je voudrais avancer mon RDV", type: "recu" },
      { texte: "Je peux vous proposer jeudi à 14h", type: "envoye" },
      { texte: "D'accord, à jeudi alors", type: "recu" },
    ],
  },
  {
    id: 3,
    nom: "Ibrahima Sow",
    dernierMsg: "Très bien, merci docteur",
    heure: "Hier",
    messages: [
      { texte: "Les résultats sont bons ?", type: "recu" },
      { texte: "Oui tout est normal, rien d'inquiétant", type: "envoye" },
      { texte: "Très bien, merci docteur", type: "recu" },
    ],
  },
];

export default function MessagerieMedecinPage() {
  const [convActive, setConvActive] = useState(conversations[0]);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") return;
    convActive.messages.push({ texte: message, type: "envoye" });
    setMessage("");
  };

  return (
    <div className="messagerie-container">
      <h1>Ma <span>Messagerie</span></h1>
      <p>Communiquez avec vos patients en toute sécurité</p>

      <div className="messagerie-layout">
        <div className="conversations-list">
          {conversations.map((c) => (
            <div
              key={c.id}
              className={`conversation-item ${convActive.id === c.id ? "active" : ""}`}
              onClick={() => setConvActive(c)}
            >
              <div className="conv-avatar">
                <FaUser color="#00C96B" />
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
              <FaUser color="#00C96B" />
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