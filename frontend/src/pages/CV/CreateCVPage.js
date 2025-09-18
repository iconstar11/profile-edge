import React from "react";
import { useNavigate } from "react-router-dom";

import "./CreateCVPage.css";
import { Upload, FileText, Sparkles } from "lucide-react";
import CreateCVHeader from "../../components/CreateCVHeader";


const CreateCVPage = () => {
  const navigate = useNavigate();

  return (
    <div className="create-cv-page">
      {/* Step Progress */}
      <CreateCVHeader activeStep={1} />


      {/* Header */}
      <div className="create-cv-header">
        <h2>Create Your Perfect CV</h2>
        <p>Choose how you'd like to get started with your CV creation</p>
      </div>

      {/* Options */}
      <div className="cv-options">
        {/* Upload CV */}
        <div className="cv-card">
          <div className="icon upload-icon">
            <Upload size={28} />
          </div>
          <h3>Upload Existing CV</h3>
          <p>Upload your current CV and let AI enhance it</p>
          <div className="upload-box">
            <FileText size={22} />
            <span>Click to upload PDF or DOCX</span>
          </div>
          <button className="btn-success">Choose File</button>
        </div>

        {/* Create from Scratch */}
        <div className="cv-card highlighted">
          <div className="icon scratch-icon">
            <FileText size={28} />
          </div>
          <h3>Create from Scratch</h3>
          <p>Build your CV step-by-step with AI guidance</p>
          <ul className="checklist">
            <li>Personal information</li>
            <li>Work experience</li>
            <li>Education & skills</li>
          </ul>
          <button className="btn-primary" onClick={() => navigate("/start-fresh")}>Start Fresh</button>
        </div>

        {/* AI Interview */}
        <div className="cv-card">
          <div className="icon ai-icon">
            <Sparkles size={28} />
          </div>
          <h3>AI Interview</h3>
          <p>
            Our AI will conduct a friendly interview to understand your
            background and create a tailored CV.
          </p>
          <button className="btn-outline">Start AI Interview</button>
        </div>
      </div>

      {/* Footer Note */}
      <p className="footer-note">
        All methods include AI-powered suggestions and ATS optimization
      </p>
    </div>
  );
};

export default CreateCVPage;
