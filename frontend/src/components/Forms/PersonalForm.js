import React from "react";
import "./FormSection.css";

function PersonalForm() {
  return (
    <div className="form-section">
      <h4>Personal Information</h4>
      <div className="form-grid">
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="John Doe" />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="john@example.com" />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input type="tel" placeholder="+1 (555) 123-4567" />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input type="text" placeholder="New York, NY" />
        </div>

        <div className="form-group">
          <label>LinkedIn</label>
          <input type="text" placeholder="linkedin.com/in/johndoe" />
        </div>

        <div className="form-group">
          <label>Website</label>
          <input type="text" placeholder="johndoe.dev" />
        </div>

        <div className="form-group full-width">
          <label>Professional Summary</label>
          <textarea placeholder="Brief overview of your professional background..." rows="4"></textarea>
        </div>
      </div>
    </div>
  );
}

export default PersonalForm;
