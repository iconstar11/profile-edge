import React from "react";
import "./CVPreview.css";

function CVPreview({ personalInfo, experiences, educationList, skills = [] }) {
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

        {/* Work Experience */}
        {experiences.length > 0 && (
          <div className="preview-section">
            <h4>Work Experience</h4>
            {experiences.map((exp) => (
              <div key={exp.id} className="preview-experience">
                <p className="exp-title">
                  <strong>{exp.title || "Job Title"}</strong> — {exp.company || "Company"}
                </p>
                <p className="exp-meta">
                  {exp.location && <span>{exp.location}</span>}
                  {exp.startDate && <span> | {exp.startDate}</span>}
                </p>
                {exp.description && <p className="exp-desc">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}


        {educationList && educationList.length > 0 && (
          <div className="preview-section">
            <h4>Education</h4>
            {educationList.map((edu) => (
              <div key={edu.id} className="preview-item">
                <p>
                  <strong>{edu.degree || "Degree"}</strong>{" "}
                  {edu.school && `— ${edu.school}`}
                </p>
                <p>
                  {edu.location && <span>{edu.location}</span>}
                  {edu.graduationDate && (
                    <span> | Graduated: {edu.graduationDate}</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="preview-section">
            <h4>Skills</h4>
            <ul className="skills-preview-list">
              {skills.map((skill) => (
                <li key={skill.id}>{skill.name}</li>
              ))}
            </ul>
          </div>
        )}


        {!personalInfo.summary &&
          (!experiences || experiences.length === 0) &&
          (!educationList || educationList.length === 0) && (
            <div className="preview-placeholder">
              [Your CV content will appear here as you fill forms]
            </div>
          )}
      </div>
    </div>
  );
}

export default CVPreview;
