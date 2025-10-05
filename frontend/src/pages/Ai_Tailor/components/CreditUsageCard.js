import React from "react";
import "./stylesTailorResume.css";

export default function CreditUsageCard({ credits = 0 }) {
  return (
    <div className="credits-card">
      <h2 className="section-title">Credit Usage</h2>
      <p className="section-subtitle">
        AI tailoring requires credits to generate a personalized resume.
      </p>

      <div className="credit-info">
        <p className="credit-line">
          <strong>Tailoring cost:</strong> 1 credit
        </p>
        <p className="credit-line">
          <strong>Available credits:</strong> {credits}
        </p>
      </div>

      <div className="credit-bar-wrapper">
        <div
          className="credit-bar-fill"
          style={{ width: `${Math.min((credits / 10) * 100, 100)}%` }}
        ></div>
      </div>

      {credits <= 0 && (
        <p className="credit-warning">
          ⚠️ You have no credits left. Please top up to continue.
        </p>
      )}
    </div>
  );
}
