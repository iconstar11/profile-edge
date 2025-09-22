import React, { useState } from "react";
import "./FormSection.css";

function ExperienceForm() {
  const [experiences, setExperiences] = useState([]);

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { id: Date.now(), title: "", company: "", location: "", startDate: "", description: "" },
    ]);
  };

  const removeExperience = (id) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  return (
    <div className="experience-form">
      <div className="form-section">
        <div className="section-header">
          <h4>Work Experience</h4>
          <button className="add-btn" onClick={addExperience}>
            + Add Experience
          </button>
        </div>

        {experiences.map((exp) => (
          <div key={exp.id} className="experience-card">
            <button className="remove-btn" onClick={() => removeExperience(exp.id)}>
              ✕
            </button>
            <div className="form-grid">
              <div className="form-group">
                <label>Job Title</label>
                <input type="text" placeholder="Senior Developer" />
              </div>

              <div className="form-group">
                <label>Company</label>
                <input type="text" placeholder="Tech Corp" />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input type="text" placeholder="New York, NY" />
              </div>

              <div className="form-group">
                <label>Start Date</label>
                <input type="date" />
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  placeholder="Describe your key responsibilities and achievements..."
                  rows="3"
                ></textarea>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperienceForm;
