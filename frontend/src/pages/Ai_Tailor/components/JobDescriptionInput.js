import React, { useState } from "react";
import "./stylesTailorResume.css";
import { extractKeywords } from "../../../utils/api";
import { useNavigate } from "react-router-dom";

export default function JobDescriptionInput({ value, onChange }) {
  const [keywords, setKeywords] = useState([]);
  const [extracting, setExtracting] = useState(false);
  const navigate = useNavigate();

  const handleExtractKeywords = async () => {
    if (!value.trim()) return;

    setExtracting(true);
    try {
      const result = await extractKeywords(value);
      // The API returns a comma-separated string of keywords
      const extractedKeywords = result.split(",").map(k => k.trim());
      setKeywords(extractedKeywords);
    } catch (error) {
      console.error("Failed to extract keywords:", error);
      // Fallback to simple extraction if API fails
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
    } finally {
      setExtracting(false);
    }
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
        <button className="secondary" onClick={() => navigate("/coming-soon")}>
          📁 Upload File
        </button>
        <button 
          className="primary" 
          onClick={handleExtractKeywords}
          disabled={!value.trim() || extracting}
        >
          {extracting ? "Extracting..." : "⚡ Extract Keywords"}
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