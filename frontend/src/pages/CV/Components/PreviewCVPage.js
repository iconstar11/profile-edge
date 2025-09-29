import React, { useState } from "react";
import CVPreview from "../../../components/Preview/CVPreview";
import ATSReadiness from "../../../components/Forms/ATSReadiness";
import TemplateSelector from "../../../components/Forms/TemplateSelector";
import "./PreviewCVPage.css";
import CreateCVHeader from "../../../components/CreateCVHeader";

function PreviewCVPage() {
  const [activeTab, setActiveTab] = useState("preview");

  // Dummy data (later → Firebase + AI analysis)
  const atsScore = 87;
  const atsFeedback = [
    "✅ Standard formatting",
    "✅ Keywords match job description",
    "⚠ Add more industry-specific skills",
  ];

  // Placeholder CV data (later comes from form/upload/firebase)
  const personalInfo = {
    fullName: "Jane Doe",
    email: "jane.doe@email.com",
    phone: "+254 700 123 456",
    location: "Nairobi, Kenya",
    linkedin: "linkedin.com/in/janedoe",
    website: "janedoe.dev",
    summary:
      "Software Engineer with experience in React, Flutter, and AI integration.",
  };
  const experiences = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Remote",
      startDate: "Jan 2023",
      description: "Built reusable UI components with React and Tailwind.",
    },
  ];
  const educationList = [
    {
      id: 1,
      degree: "BSc Computer Science",
      school: "Daystar University",
      location: "Nairobi",
      graduationDate: "2024",
    },
  ];
  const skills = ["React", "Flutter", "Firebase", "AI", "Node.js"];

  return (
    <div className="preview-cv-page container">
        <CreateCVHeader />
      {/* Tabs */}
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
        {/* Left side */}
        <div className="cv-left">
          {activeTab === "preview" && (
            <CVPreview
              personalInfo={personalInfo}
              experiences={experiences}
              educationList={educationList}
              skills={skills}
            />
          )}
          {activeTab === "templates" && <TemplateSelector />}
        </div>

        {/* Right side */}
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
