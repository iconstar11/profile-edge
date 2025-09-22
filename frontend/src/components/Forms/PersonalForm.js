import React from "react";
import "./FormSection.css";

function PersonalForm({ personalInfo, setPersonalInfo }) {
  // Handle input change
  const handleChange = (field, value) => {
    setPersonalInfo({
      ...personalInfo,
      [field]: value,
    });
  };

  return (
    <div className="form-section">
      <h4>Personal Information</h4>
      <div className="form-grid">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={personalInfo.fullName || ""}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="john@example.com"
            value={personalInfo.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={personalInfo.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            placeholder="New York, NY"
            value={personalInfo.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>LinkedIn</label>
          <input
            type="text"
            placeholder="linkedin.com/in/johndoe"
            value={personalInfo.linkedin || ""}
            onChange={(e) => handleChange("linkedin", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Website</label>
          <input
            type="text"
            placeholder="johndoe.dev"
            value={personalInfo.website || ""}
            onChange={(e) => handleChange("website", e.target.value)}
          />
        </div>

        <div className="form-group full-width">
          <label>Professional Summary</label>
          <textarea
            placeholder="Brief overview of your professional background..."
            rows="4"
            value={personalInfo.summary || ""}
            onChange={(e) => handleChange("summary", e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default PersonalForm;
