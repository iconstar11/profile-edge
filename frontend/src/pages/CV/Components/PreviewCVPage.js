import React, { useState, useContext, useRef } from "react";
import TemplateSelector from "../../../components/Forms/TemplateSelector";
import ATSReadiness from "../../../components/Forms/ATSReadiness";
import CreateCVHeader from "../../../components/CreateCVHeader";
import { CVContext } from "../../../utils/CVContext";
import { useNavigate } from "react-router-dom";
import "./PreviewCVPage.css";
import ClassicTemplate from "./Templates/ClassicTemplate";
import ModernTemplate from "./Templates/ModernTemplate";
import ElegantTemplate from "./Templates/ElegantTemplate";
import MinimalistTemplate from "./Templates/MinimalistTemplate";

// Import download utilities
import { downloadPDF } from "../../../utils/downloadPDF";
import { downloadWord } from "../../../utils/downloadWord";


function PreviewCVPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("preview");
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [isDownloading, setIsDownloading] = useState(false);
  const cvRef = useRef(null);

  const atsScore = 87;
  const atsFeedback = [
    "✅ Standard formatting",
    "✅ Keywords match job description",
    "⚠ Add more industry-specific skills",
  ];

  const { personalInfo, experiences, educationList, skills } = useContext(CVContext);

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "elegant":
        return (
          <ElegantTemplate
            personalInfo={personalInfo}
            experiences={experiences}
            educationList={educationList}
            skills={skills}
          />
        );
      case "minimalist":
        return (
          <MinimalistTemplate
            personalInfo={personalInfo}
            experiences={experiences}
            educationList={educationList}
            skills={skills}
          />
        );
      case "modern":
        return (
          <ModernTemplate
            personalInfo={personalInfo}
            experiences={experiences}
            educationList={educationList}
            skills={skills}
          />
        );
      default:
        return (
          <ClassicTemplate
            personalInfo={personalInfo}
            experiences={experiences}
            educationList={educationList}
            skills={skills}
          />
        );
    }
  };

  // Auto-switch to preview when template is selected
  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
    setActiveTab("preview");
  };

  // Handle PDF Download
  const handleDownloadPDF = async () => {
    if (!cvRef.current) return;
    
    setIsDownloading(true);
    try {
      await downloadPDF(cvRef.current, personalInfo.fullName || "CV");
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Handle Word Download
  const handleDownloadWord = async () => {
    setIsDownloading(true);
    try {
      const cvData = {
        personalInfo,
        experiences,
        educationList,
        skills,
        template: selectedTemplate
      };
      await downloadWord(cvData, personalInfo.fullName || "CV");
    } catch (error) {
      console.error("Error downloading Word:", error);
      alert("Failed to download Word document. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Handle AI Edit
  const handleAIEdit = () => {
    // You can implement AI editing logic here
    alert("AI Edit feature coming soon! This will help optimize your CV content.");
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
          {/* Add ref to the CV template container */}
          <div ref={cvRef}>
            {activeTab === "preview" && renderTemplate()}
          </div>

          {activeTab === "templates" && (
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onChange={handleTemplateChange}
            />
          )}

          <button onClick={() => navigate("/start-fresh")}>Back</button>
        </div>

        <div className="cv-right">
          <ATSReadiness score={atsScore} feedback={atsFeedback} />

          <div className="download-panel">
            <h4>Download CV</h4>
            <button 
              className="download-btn" 
              onClick={handleDownloadPDF}
              disabled={isDownloading}
            >
              {isDownloading ? "Generating..." : "Download PDF"}
            </button>
            <button 
              className="download-btn" 
              onClick={handleDownloadWord}
              disabled={isDownloading}
            >
              {isDownloading ? "Generating..." : "Download Word"}
            </button>
            <button 
              className="edit-btn"
              onClick={handleAIEdit}
            >
              Edit with AI ✍️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewCVPage;