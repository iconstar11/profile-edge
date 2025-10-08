import React from "react";
import '../PreviewCVPage.css';

function ModernTemplate({ personalInfo, experiences, educationList, skills = [] }) {
  return (
    <div className="preview-panel modern-template">
      <header>
        <h1>{personalInfo.fullName || "Your Name"}</h1>
        <p>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span> | {personalInfo.phone}</span>}
          {personalInfo.location && <span> | {personalInfo.location}</span>}
        </p>
      </header>

      {personalInfo.summary && (
        <section>
          <h3>Summary</h3>
          <p>{personalInfo.summary}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section>
          <h3>Experience</h3>
          {experiences.map((exp) => (
            <div key={exp.id}>
              <strong>{exp.title}</strong> – {exp.company}
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {educationList.length > 0 && (
        <section>
          <h3>Education</h3>
          {educationList.map((edu) => (
            <p key={edu.id}>
              {edu.degree} — {edu.school}
            </p>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h3>Skills</h3>
          <div>{skills.join(", ")}</div>
        </section>
      )}
    </div>
  );
}

export default ModernTemplate;
