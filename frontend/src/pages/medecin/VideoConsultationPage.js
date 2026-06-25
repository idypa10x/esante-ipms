import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash,
  FaPhoneSlash, FaDesktop, FaUser
} from "react-icons/fa";
import "./VideoConsultationPage.css";

export default function VideoConsultationPage() {
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const patient = {
    nom: "Mouhamadou Gueye",
    age: "22 ans",
    motif: "Infection respiratoire",
    derniereVisite: "15 juin 2026",
  };

  const handleEndCall = () => {
    alert("Consultation vidéo terminée !");
    navigate("/medecin");
  };

  const handleOrdonnance = () => {
    navigate("/medecin/ordonnance");
  };

  return (
    <div className="video-container">
      <h1>Consultation <span>Vidéo</span></h1>
      <p>Téléconsultation en cours avec le patient</p>

      <div className="video-grid">
        {/* ZONE VIDEO */}
        <div className="video-main">
          <div className="video-screen">
            {cameraOff ? (
              <div className="video-placeholder">
                <div className="avatar">
                  <FaUser color="#00C96B" />
                </div>
                <h3>{patient.nom}</h3>
                <p>Caméra du médecin désactivée</p>
              </div>
            ) : (
              <div className="video-placeholder">
                <div className="avatar">
                  <FaUser color="#00C96B" />
                </div>
                <h3>{patient.nom}</h3>
                <p>Connexion vidéo en cours...</p>
              </div>
            )}
            <div className="video-self">Vous (Dr. Diallo)</div>
          </div>

          <div className="video-controls">
            <button
              className={`ctrl-btn mute ${muted ? "active" : ""}`}
              onClick={() => setMuted(!muted)}
            >
              {muted ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </button>
            <button
              className={`ctrl-btn camera ${cameraOff ? "active" : ""}`}
              onClick={() => setCameraOff(!cameraOff)}
            >
              {cameraOff ? <FaVideoSlash /> : <FaVideo />}
            </button>
            <button className="ctrl-btn screen">
              <FaDesktop />
            </button>
            <button className="ctrl-btn end" onClick={handleEndCall}>
              <FaPhoneSlash />
            </button>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="video-sidebar">
          <div className="patient-info-card">
            <h3>👤 Informations patient</h3>
            <div className="info-row">
              <span>Nom</span>
              <span>{patient.nom}</span>
            </div>
            <div className="info-row">
              <span>Âge</span>
              <span>{patient.age}</span>
            </div>
            <div className="info-row">
              <span>Motif</span>
              <span>{patient.motif}</span>
            </div>
            <div className="info-row">
              <span>Dernière visite</span>
              <span>{patient.derniereVisite}</span>
            </div>
          </div>

          <div className="notes-video">
            <h3>📝 Notes de consultation</h3>
            <textarea
              placeholder="Observations pendant la téléconsultation..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <button className="btn-ordonnance-video" onClick={handleOrdonnance}>
              Rédiger une ordonnance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}