// src/components/Templates/MinimalistTemplate.js
import React from "react";
import "./MinimalistTemplate.css";

const MinimalistTemplate = ({ personalInfo, experiences, educationList, skills }) => {
  return (
    <div className="minimalist-template">
      {/* Header */}
      <header className="minimalist-header">
        <h1>{personalInfo.fullName || "Your Name"}</h1>
        <p>{personalInfo.title || "Professional Title"}</p>
        <p>
          {personalInfo.email || "email@example.com"} |{" "}
          {personalInfo.phone || "123-456-7890"} |{" "}
          {personalInfo.location || "Nairobi, Kenya"}
        </p>
      </header>

      {/* Experience Section */}
      <section className="section">
        <h2>Experience</h2>
        {experiences && experiences.length > 0 ? (
          experiences.map((exp, i) => (
            <div key={i} className="exp-item">
              <div className="exp-header">
                <span className="exp-role">{exp.role || "Job Title"}</span>
                <span className="exp-date">
                  {exp.startDate} – {exp.endDate}
                </span>
              </div>
              <p className="exp-company">{exp.company || "Company Name"}</p>
              <p className="exp-desc">{exp.description || "Description"}</p>
            </div>
          ))
        ) : (
          <p className="placeholder">No experience added yet.</p>
        )}
      </section>

      {/* Education Section */}
      <section className="section">
        <h2>Education</h2>
        {educationList && educationList.length > 0 ? (
          educationList.map((edu, i) => (
            <div key={i} className="edu-item">
              <div className="edu-header">
                <span className="edu-degree">{edu.degree}</span>
                <span className="edu-year">{edu.year}</span>
              </div>
              <p className="edu-school">{edu.school}</p>
            </div>
          ))
        ) : (
          <p className="placeholder">No education added yet.</p>
        )}
      </section>

      {/* Skills Section */}
      <section className="section">
        <h2>Skills</h2>
        <div className="skills">
          {skills && skills.length > 0 ? (
            skills.map((skill, i) => <span key={i}>{skill}</span>)
          ) : (
            <p className="placeholder">No skills added yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default MinimalistTemplate;
