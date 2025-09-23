import React from "react";
import "./FormSection.css";

function ExperienceForm({ experiences, setExperiences }) {
  // Add new experience entry
  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now(),
        title: "",
        company: "",
        location: "",
        startDate: "",
        description: "",
      },
    ]);
  };

  // Remove experience entry
  const removeExperience = (id) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  // Handle input change
  const handleChange = (id, field, value) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
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
            <button
              className="remove-btn"
              onClick={() => removeExperience(exp.id)}
            >
              ✕
            </button>
            <div className="form-grid">
              <div className="form-group">
                <label>Job Title</label>
                <input
                  type="text"
                  placeholder="Senior Developer"
                  value={exp.title}
                  onChange={(e) =>
                    handleChange(exp.id, "title", e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  placeholder="Tech Corp"
                  value={exp.company}
                  onChange={(e) =>
                    handleChange(exp.id, "company", e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="New York, NY"
                  value={exp.location}
                  onChange={(e) =>
                    handleChange(exp.id, "location", e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={exp.startDate}
                  onChange={(e) =>
                    handleChange(exp.id, "startDate", e.target.value)
                  }
                />
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  placeholder="Describe your key responsibilities and achievements..."
                  rows="3"
                  value={exp.description}
                  onChange={(e) =>
                    handleChange(exp.id, "description", e.target.value)
                  }
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
