import React, { useState, useContext } from "react";
import CVPreview from "../../../components/Preview/CVPreview";
import ATSReadiness from "../../../components/Forms/ATSReadiness";
import TemplateSelector from "../../../components/Forms/TemplateSelector";
import "./PreviewCVPage.css";
import CreateCVHeader from "../../../components/CreateCVHeader";
import { CVContext } from "../../../utils/CVContext";
import { useNavigate } from "react-router-dom";

function PreviewCVPage () {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("preview");
    const atsScore = 87;
    const atsFeedback = 
    [
        "✅ Standard formatting",
        "✅ Keywords match job description",
        "⚠ Add more industry-specific skills",
    ];
    const {
        personalInfo, experiences, educationList, skills,
    } = useContext(CVContext);

    return (
        <div className="preview-cv-page container">
            <CreateCVHeader activeStep={3} />
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
                    <button onClick={() => navigate("/start-fresh")}>Back</button>

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
