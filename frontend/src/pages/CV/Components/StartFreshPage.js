import React, { useState } from "react";
import "./StartFreshPage.css"; // create a CSS file later
import { useNavigate } from "react-router-dom";
import CreateCVHeader from "./CreateCVHeader";

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
          <div className="tab-content">
            {activeTab === "personal" && <p>Personal Info Form here</p>}
            {activeTab === "experience" && (
              <div>
                <h4>Work Experience</h4>
                <button className="add-btn">+ Add Experience</button>
              </div>
            )}
            {activeTab === "education" && (
              <div>
                <h4>Education</h4>
                <button className="add-btn">+ Add Education</button>
              </div>
            )}
            {activeTab === "skills" && (
              <div>
                <h4>Skills</h4>
                <button className="add-btn">+ Add Skill</button>
              </div>
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
        <div className="preview-panel">
          <h3>CV Preview</h3>
          <div className="preview-box">
            <p className="preview-name">Your Name</p>
            <p className="preview-placeholder">[Template Preview Here]</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartFreshPage;
