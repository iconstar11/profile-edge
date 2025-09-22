import React, { useState } from 'react';
import './FormSection.css';

function EducationForm() {
  const [educationList, setEducationList] = useState([]);

  // Add new empty education entry
  const handleAddEducation = () => {
    setEducationList([
      ...educationList,
      {
        level: '',
        degree: '',
        school: '',
        location: '',
        graduationDate: '',
        id: Date.now()
      }
    ]);
  };

  // Update field for a specific entry
  const handleChange = (id, field, value) => {
    setEducationList(
      educationList.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  // Remove an entry
  const handleRemove = (id) => {
    setEducationList(educationList.filter(edu => edu.id !== id));
  };

  // Helper to map level -> degree label
  const getDegreeLabel = (level) => {
    switch (level) {
      case 'Certificate': return 'Certificate'
      case 'Diploma': return 'Diploma';
      case 'Bachelor': return 'Bachelor Degree';
      case 'Master': return 'Master Degree';
      case 'PhD': return 'PhD Program';

      default: return 'Degree';
    }
  };

  return (
    <div className="education-form">
      <div className="form-section">
        <div className="section-header">
          <h4>Education</h4>
          <button className="add-btn" onClick={handleAddEducation}>
            + Add Education
          </button>
        </div>

        {educationList.map((edu) => (
          <div key={edu.id} className="experience-card">
            <button
              className="remove-btn"
              onClick={() => handleRemove(edu.id)}
            >
              ✕
            </button>

            <div className="form-grid">
              {/* Level Dropdown */}
              <div className="form-group">
                <label>Level</label>
                <select
                  value={edu.level}
                  onChange={(e) => handleChange(edu.id, 'level', e.target.value)}
                >
                  <option value="">Select Level</option>
                  <option value='Certificate'>Certificate</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Master">Master</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>

              {/* Degree (label changes with level) */}
              <div className="form-group">
                <label>{getDegreeLabel(edu.level)}</label>
                <input
                  type="text"
                  placeholder="e.g., Bachelor of Science, Master of Arts"
                  value={edu.degree}
                  onChange={(e) =>
                    handleChange(edu.id, 'degree', e.target.value)
                  }
                />
              </div>

              {/* School */}
              <div className="form-group">
                <label>School</label>
                <input
                  type="text"
                  placeholder="e.g., University of Technology"
                  value={edu.school}
                  onChange={(e) =>
                    handleChange(edu.id, 'school', e.target.value)
                  }
                />
              </div>

              {/* Location */}
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="e.g., New York, NY"
                  value={edu.location}
                  onChange={(e) =>
                    handleChange(edu.id, 'location', e.target.value)
                  }
                />
              </div>

              {/* Graduation Date */}
              <div className="form-group">
                <label>Graduation Date</label>
                <input
                  type="date"
                  value={edu.graduationDate}
                  onChange={(e) =>
                    handleChange(edu.id, 'graduationDate', e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        ))}


      </div>
    </div>
  );
}

export default EducationForm;
