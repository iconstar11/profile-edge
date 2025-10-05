import React, { useState } from "react";
import "./stylesTailorResume.css";

export default function JobDescriptionInput({ value, onChange }) {
  const [keywords, setKeywords] = useState([]);

  const handleExtractKeywords = () => {
    if (!value.trim()) return;

    // Mock keyword extraction: pick top frequent words > 4 chars
    const words = value
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter(w => w.length > 4);

    const freq = {};
    words.forEach(w => {
      const word = w.toLowerCase();
      freq[word] = (freq[word] || 0) + 1;
    });

    const sorted = Object.keys(freq).sort((a, b) => freq[b] - freq[a]);
    setKeywords(sorted.slice(0, 5));
  };

  return (
    <div className="jobdesc-card">
      <h2 className="section-title">Job Description</h2>
      <p className="section-subtitle">Paste the job posting or upload a file</p>

      <textarea
        className="jobdesc-textarea"
        placeholder="Paste the job description here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <div className="jobdesc-actions">
        <button className="secondary" disabled>
          📁 Upload File
        </button>
        <button className="primary" onClick={handleExtractKeywords}>
          ⚡ Extract Keywords
        </button>
      </div>

      {keywords.length > 0 && (
        <div className="keywords-container">
          <h4>Extracted Keywords:</h4>
          <div className="keyword-tags">
            {keywords.map((word, i) => (
              <span key={i} className="keyword-tag">
                {word}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
