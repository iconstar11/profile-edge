import React, { useState, useContext } from "react";


import TemplateSelector from "../../../components/Forms/TemplateSelector";
import ATSReadiness from "../../../components/Forms/ATSReadiness";
import CreateCVHeader from "../../../components/CreateCVHeader";
import { CVContext } from "../../../utils/CVContext";
import { useNavigate } from "react-router-dom";
import "./PreviewCVPage.css";
import ClassicTemplate from "./Templates/ClassicTemplate";
import ModernTemplate from "./Templates/ModernTemplate";

function PreviewCVPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("preview");
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const atsScore = 87;
  const atsFeedback = [
    "✅ Standard formatting",
    "✅ Keywords match job description",
    "⚠ Add more industry-specific skills",
  ];

  const { personalInfo, experiences, educationList, skills } = useContext(CVContext);

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "modern":
        return (
            <ClassicTemplate
            personalInfo={personalInfo}
            experiences={experiences}
            educationList={educationList}
            skills={skills}
          />
          
        );
      default:
        return (
            <ModernTemplate
            personalInfo={personalInfo}
            experiences={experiences}
            educationList={educationList}
            skills={skills}
          />      
        );
    }
  };

  return (
    <div className="preview-cv-page container">
      <CreateCVHeader activeStep={3} />

      <div className="tabs">
        <button
          className={activeTab === "preview" ? "active" : ""}
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </button>
        <button
          className={activeTab === "templates" ? "active" : ""}
          onClick={() => setActiveTab("templates")}
        >
          Templates
        </button>
      </div>

      <div className="content-grid">
        <div className="cv-left">
          {activeTab === "preview" && renderTemplate()}

          {activeTab === "templates" && (
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onChange={setSelectedTemplate}
            />
          )}

          <button onClick={() => navigate("/start-fresh")}>Back</button>
        </div>

        <div className="cv-right">
          <ATSReadiness score={atsScore} feedback={atsFeedback} />

          <div className="download-panel">
            <h4>Download CV</h4>
            <button className="download-btn">Download PDF</button>
            <button className="download-btn">Download Word</button>
            <button className="edit-btn">Edit with AI ✍️</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewCVPage;
