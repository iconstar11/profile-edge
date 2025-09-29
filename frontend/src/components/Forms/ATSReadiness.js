import React from "react";

function ATSReadiness({ score, feedback }) {
  return (
    <div className="ats-panel">
      <h4>ATS Readiness</h4>
      <div className="ats-score">
        <span>{score}%</span>
        <div className="ats-bar">
          <div className="ats-bar-fill" style={{ width: `${score}%` }}></div>
        </div>
      </div>
      <ul className="ats-feedback">
        {feedback.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ATSReadiness;
