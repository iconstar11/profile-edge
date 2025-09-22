import React from "react";
import "./CVPreview.css";

function CVPreview({ personalInfo }) {
  return (
    <div className="preview-panel">
      <h3>CV Preview</h3>
      <div className="preview-box">
        {/* Personal Info */}
        <p className="preview-name">{personalInfo.fullName || "Your Name"}</p>
        <p>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span> | {personalInfo.phone}</span>}
          {personalInfo.location && <span> | {personalInfo.location}</span>}
        </p>
        {personalInfo.linkedin && (
          <p>
            <strong>LinkedIn:</strong> {personalInfo.linkedin}
          </p>
        )}
        {personalInfo.website && (
          <p>
            <strong>Website:</strong> {personalInfo.website}
          </p>
        )}

        {/* Professional Summary */}
        {personalInfo.summary && (
          <div className="preview-section">
            <h4>Professional Summary</h4>
            <p>{personalInfo.summary}</p>
          </div>
        )}

        {/* Later: Add Experience, Education, Skills */}
        <div className="preview-placeholder">
          [Your CV content will appear here as you fill forms]
        </div>
      </div>
    </div>
  );
}

export default CVPreview;
