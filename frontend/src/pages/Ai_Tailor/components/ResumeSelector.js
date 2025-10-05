import React from "react";
import "./stylesTailorResume.css";

export default function ResumeSelector({ selected, onChange }) {
  // Mock Firestore data
  const resumes = [
    { id: 1, name: "Master Resume", updated: "2 days ago" },
    { id: 2, name: "Marketing Resume", updated: "5 days ago" },
    { id: 3, name: "Version B", updated: "1 week ago" },
  ];

  return (
    <div className="resume-card">
      <h2 className="section-title">Select Resume Version</h2>
      <p className="section-subtitle">Choose which resume to tailor</p>

      <div className="resume-select-wrapper">
        <select
          className="resume-select"
          value={selected}
          onChange={(e) => onChange(e.target.value)}
        >
          {resumes.map((r) => (
            <option key={r.id} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>
        <small className="resume-updated">
          {
            resumes.find((r) => r.name === selected)?.updated ||
            "Last updated unknown"
          }
        </small>
      </div>
    </div>
  );
}
