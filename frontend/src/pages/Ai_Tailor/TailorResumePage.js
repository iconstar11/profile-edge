import React, { useState } from "react";
import "./components/stylesTailorResume.css";
import JobDescriptionInput from "./components/JobDescriptionInput";
import ResumeSelector from "./components/ResumeSelector";
import TailoringOptions from "./components/TailoringOptions";
import CreditUsageCard from "./components/CreditUsageCard";

export default function TailorResumePage() {
  const [jobDesc, setJobDesc] = useState("");
  const [selectedResume, setSelectedResume] = useState("Master Resume");
  const [options, setOptions] = useState({
    keywords: true,
    ats: false,
    tone: "professional",
  });

  const handleTailorResume = () => {
    const payload = { jobDesc, selectedResume, options };
    console.log("Sending to backend:", payload);
    // TODO: Navigate to result page
  };

  // Disable button if job description or resume not provided
  const isButtonDisabled = !jobDesc.trim() || !selectedResume;

  return (
    <div className="tailor-page">
      <div className="left-column">
        <JobDescriptionInput value={jobDesc} onChange={setJobDesc} />
        <ResumeSelector selected={selectedResume} onChange={setSelectedResume} />
        <TailoringOptions options={options} onChange={setOptions} />

        <button
          className={`tailor-btn ${isButtonDisabled ? "disabled" : ""}`}
          onClick={handleTailorResume}
          disabled={isButtonDisabled}
        >
          🚀 Tailor My Resume
        </button>
      </div>

      <div className="right-column">
        <CreditUsageCard credits={5} />
        <div className="howitworks-card">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            1. Paste your job description<br />
            2. Select which resume version to tailor<br />
            3. Choose tailoring options<br />
            4. Click “Tailor My Resume” to generate a personalized version
          </p>
        </div>
      </div>
    </div>
  );
}