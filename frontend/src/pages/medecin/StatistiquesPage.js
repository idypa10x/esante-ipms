import { FaUserInjured, FaCalendarAlt, FaFileMedical, FaVideo } from "react-icons/fa";
import "./StatistiquesPage.css";

const rdvParMois = [
  { mois: "Jan", val: 38 },
  { mois: "Fév", val: 42 },
  { mois: "Mar", val: 55 },
  { mois: "Avr", val: 47 },
  { mois: "Mai", val: 61 },
  { mois: "Juin", val: 49 },
];

const max = Math.max(...rdvParMois.map((r) => r.val));

const specialites = [
  { label: "Généraliste", pct: 60, color: "#00FF87" },
  { label: "Suivi chronique", pct: 25, color: "#00C96B" },
  { label: "Pédiatrie", pct: 15, color: "#E6FFF5" },
];

export default function StatistiquesPage() {
  return (
    <div className="stats-container">
      <h1>Mes <span>Statistiques</span></h1>
      <p>Suivi de votre activité médicale</p>

      <div className="stats-top">
        <div className="stat-box">
          <FaUserInjured className="stat-icon" />
          <div className="stat-val">128</div>
          <div className="stat-lbl">Patients suivis</div>
          <div className="stat-trend">↑ +8 ce mois</div>
        </div>
        <div className="stat-box">
          <FaCalendarAlt className="stat-icon" />
          <div className="stat-val">49</div>
          <div className="stat-lbl">RDV ce mois</div>
          <div className="stat-trend">↑ +12% vs mai</div>
        </div>
        <div className="stat-box">
          <FaFileMedical className="stat-icon" />
          <div className="stat-val">32</div>
          <div className="stat-lbl">Ordonnances</div>
          <div className="stat-trend">↑ +5 ce mois</div>
        </div>
        <div className="stat-box">
          <FaVideo className="stat-icon" />
          <div className="stat-val">14</div>
          <div className="stat-lbl">Téléconsultations</div>
          <div className="stat-trend">↑ +3 ce mois</div>
        </div>
      </div>

      <div className="stats-charts">
        <div className="chart-card">
          <h3>📊 RDV par mois</h3>
          <div className="bar-chart">
            {rdvParMois.map((r) => (
              <div className="bar-col" key={r.mois}>
                <div className="bar-value">{r.val}</div>
                <div
                  className="bar-fill"
                  style={{ height: `${(r.val / max) * 120}px` }}
                />
                <div className="bar-label">{r.mois}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3>🩺 Types de consultations</h3>
          <div className="donut-wrapper">
            <svg width="120" height="120" viewBox="0 0 42 42">
              <circle cx="21" cy="21" r="15.9" fill="transparent"
                stroke="#00FF87" strokeWidth="6"
                strokeDasharray="60 40" strokeDashoffset="25" />
              <circle cx="21" cy="21" r="15.9" fill="transparent"
                stroke="#00C96B" strokeWidth="6"
                strokeDasharray="25 75" strokeDashoffset="-35" />
              <circle cx="21" cy="21" r="15.9" fill="transparent"
                stroke="#E6FFF5" strokeWidth="6"
                strokeDasharray="15 85" strokeDashoffset="-60" />
            </svg>
            <div className="donut-legend">
              {specialites.map((s, i) => (
                <div className="legend-item" key={i}>
                  <div className="legend-dot" style={{ backgroundColor: s.color, border: "1px solid #ccc" }} />
                  <span>{s.label} — {s.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}