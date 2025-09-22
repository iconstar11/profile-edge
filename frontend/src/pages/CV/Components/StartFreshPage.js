import React, { useState } from "react";
import "./StartFreshPage.css"; 
import { useNavigate } from "react-router-dom";

// Components
import CreateCVHeader from "../../../components/CreateCVHeader";
import CVPreview from "../../../components/Preview/CVPreview";
import SkillsForm from "../../../components/Forms/SkillsForm";
import PersonalForm from "../../../components/Forms/PersonalForm";
import ExperienceForm from "../../../components/Forms/ExperienceForm";
import EducationForm from "../../../components/Forms/EducationForm";

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
            {activeTab === "personal" && (
              <PersonalForm />
            )}

            {activeTab === "experience" && (
              <ExperienceForm />
            )}

            {activeTab === "education" && (
              <EducationForm />
            )}

            {activeTab === "skills" && ( <SkillsForm /> )}
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
