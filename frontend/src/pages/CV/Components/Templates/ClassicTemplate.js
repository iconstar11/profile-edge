import React from "react";
import "./ClassicTemplate.css";

function ClassicTemplate({ personalInfo, experiences, educationList, skills = [] }) {
  return (
    <div className="classic-template">
      {/* Header */}
      <header className="classic-header">
        <h1>{personalInfo.fullName || "Your Name"}</h1>
        <p className="classic-contact">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span> | {personalInfo.phone}</span>}
          {personalInfo.location && <span> | {personalInfo.location}</span>}
        </p>
        {(personalInfo.linkedin || personalInfo.website) && (
          <p className="classic-links">
            {personalInfo.linkedin && (
              <span>
                LinkedIn: <a href={personalInfo.linkedin}>{personalInfo.linkedin}</a>
              </span>
            )}
            {personalInfo.website && (
              <span>
                {" "}| Website:{" "}
                <a href={personalInfo.website}>{personalInfo.website}</a>
              </span>
            )}
          </p>
        )}
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="classic-section">
          <h2>Professional Summary</h2>
          <p>{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <section className="classic-section">
          <h2>Work Experience</h2>
          {experiences.map((exp) => (
            <div key={exp.id} className="classic-experience">
              <p className="exp-title">
                <strong>{exp.title || "Job Title"}</strong> — {exp.company || "Company"}
              </p>
              <p className="exp-meta">
                {exp.location && <span>{exp.location}</span>}
                {exp.startDate && <span> | {exp.startDate}</span>}
                {exp.endDate && <span> - {exp.endDate}</span>}
              </p>
              {exp.description && <p className="exp-desc">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {educationList && educationList.length > 0 && (
        <section className="classic-section">
          <h2>Education</h2>
          {educationList.map((edu) => (
            <div key={edu.id} className="classic-education">
              <p>
                <strong>{edu.degree || "Degree"}</strong>
                {edu.school && ` — ${edu.school}`}
              </p>
              <p>
                {edu.location && <span>{edu.location}</span>}
                {edu.graduationDate && (
                  <span> | Graduated: {edu.graduationDate}</span>
                )}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="classic-section">
          <h2>Skills</h2>
          <ul className="classic-skills">
            {skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Placeholder */}
      {!personalInfo.summary &&
        (!experiences || experiences.length === 0) &&
        (!educationList || educationList.length === 0) &&
        skills.length === 0 && (
          <div className="classic-placeholder">
            [Fill in your details to see your CV here]
          </div>
        )}
    </div>
  );
}

export default ClassicTemplate;
