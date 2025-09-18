import React, { useState } from "react";
import "./StartFreshPage.css"; // create a CSS file later
import { useNavigate } from "react-router-dom";
import CreateCVHeader from "../../../components/CreateCVHeader";
import CVPreview from "../../../components/Preview/CVPreview";
import SkillsForm from "../../../components/Forms/SkillsForm";

const StartFreshPage = () => {
  const navigate = useNavigate();

  // Track which tab is active
  const [activeTab, setActiveTab] = useState("experience");

  return (
    <div className="start-fresh-page">
      {/* Progress Steps */}
      <CreateCVHeader activeStep={2} />


      <div className="main-content">
        {/* Left side form */}
        <div className="editor-panel">
          {/* Target Role Optimization */}
          <div className="role-optimization">
            <h3>🎯 Target Role Optimization</h3>
            <p>Tell us about your target role to get personalized suggestions</p>
            <div className="role-input">
              <input
                type="text"
                placeholder="e.g., Senior Frontend Developer, Product Manager"
              />
              <button className="optimize-btn">Optimize</button>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            {["personal", "experience", "education", "skills"].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === "personal" && (
              <div className="form-section">
                <h4>Personal Info</h4>
                <input type="text" placeholder="Full Name" />
                <input type="email" placeholder="Email" />
                <input type="tel" placeholder="Phone" />
                <input type="text" placeholder="Location" />
                <textarea placeholder="Summary / About You" rows="3"></textarea>
              </div>
            )}

            {activeTab === "experience" && (
              <div className="form-section">
                <h4>Work Experience</h4>
                {/* Dynamic list of experiences goes here */}
                <button className="add-btn">+ Add Experience</button>
              </div>
            )}

            {activeTab === "education" && (
              <div className="form-section">
                <h4>Education</h4>
                {/* Dynamic list of education entries goes here */}
                <button className="add-btn">+ Add Education</button>
              </div>
            )}

            {activeTab === "skills" && (
<SkillsForm />
            )}
          </div>


          {/* Navigation Buttons */}
          <div className="actions">
            <button className="back-btn" onClick={() => navigate("/")}>
              Back
            </button>
            <button className="next-btn" onClick={() => navigate("/preview")}>
              Preview CV
            </button>
          </div>
        </div>

        {/* Right side preview */}
        <CVPreview />
        
      </div>
    </div>
  );
};

export default StartFreshPage;
