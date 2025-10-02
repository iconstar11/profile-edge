import React, { useState, useContext } from "react";
import "./StartFreshPage.css";
import { useNavigate } from "react-router-dom";

import CreateCVHeader from "../../../components/CreateCVHeader";
import CVPreview from "../../../components/Preview/CVPreview";
import SkillsForm from "../../../components/Forms/SkillsForm";
import PersonalForm from "../../../components/Forms/PersonalForm";
import ExperienceForm from "../../../components/Forms/ExperienceForm";
import EducationForm from "../../../components/Forms/EducationForm";
import { CVContext } from "../../../utils/CVContext";

const StartFreshPage = () => {
  const navigate = useNavigate();
  const {
    personalInfo, setPersonalInfo,
    experiences, setExperiences,
    educationList, setEducationList,
    skills, setSkills,
  } = useContext(CVContext); 

  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="start-fresh-page">
      <CreateCVHeader activeStep={2} />

      <div className="main-content">
        <div className="editor-panel">
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
              <PersonalForm personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />
            )}
            {activeTab === "experience" && (
              <ExperienceForm experiences={experiences} setExperiences={setExperiences} />
            )}
            {activeTab === "education" && (
              <EducationForm educationList={educationList} setEducationList={setEducationList} />
            )}
            {activeTab === "skills" && (
              <SkillsForm skills={skills} setSkills={setSkills} />
            )}
          </div>

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
        <CVPreview
          personalInfo={personalInfo}
          experiences={experiences}
          educationList={educationList}
          skills={skills}
        />
      </div>
    </div>
  );
};

export default StartFreshPage;
