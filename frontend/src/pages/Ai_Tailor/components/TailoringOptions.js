import React from "react";
import "./stylesTailorResume.css";

export default function TailoringOptions({ options, onChange }) {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    onChange({ ...options, [name]: checked });
  };

  const handleToneChange = (e) => {
    onChange({ ...options, tone: e.target.value });
  };

  return (
    <div className="options-card">
      <h2 className="section-title">Tailoring Options</h2>
      <p className="section-subtitle">
        Customize how your resume will be tailored
      </p>

      <div className="options-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="keywords"
            checked={options.keywords}
            onChange={handleCheckboxChange}
          />
          Focus on Keywords Match
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="ats"
            checked={options.ats}
            onChange={handleCheckboxChange}
          />
          Optimize for ATS
        </label>
      </div>

      <div className="tone-group">
        <h4 className="tone-label">Tone Preference:</h4>
        <div className="tone-options">
          {["professional", "creative", "minimal"].map((tone) => (
            <label key={tone} className="radio-label">
              <input
                type="radio"
                name="tone"
                value={tone}
                checked={options.tone === tone}
                onChange={handleToneChange}
              />
              {tone.charAt(0).toUpperCase() + tone.slice(1)}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
