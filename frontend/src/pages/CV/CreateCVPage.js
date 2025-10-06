import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateCVPage.css";
import { Upload, FileText, Sparkles } from "lucide-react";
import CreateCVHeader from "../../components/CreateCVHeader";

// ✅ Firebase imports
import { auth } from "../../firebase/firebaseConfig";

const CreateCVPage = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // ✅ Only allow PDF or DOCX
    if (
      ![
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type)
    ) {
      alert("Please upload a PDF or DOCX file.");
      return;
    }

    setUploading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Please log in first.");
        setUploading(false);
        return;
      }

      // 🔥 Prepare form data
      const formData = new FormData();
      formData.append("uid", user.uid);
      formData.append("file", file);

      // 🌐 Send file to Cloud Function
      const response = await fetch(
        "https://us-central1-profileedgelatest.cloudfunctions.net/uploadAndExtractCV",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("✅ CV text extracted and stored successfully!");
        console.log("Extracted resume ID:", data.resumeId);
        // Optionally navigate to preview
        // navigate(`/resume/${data.resumeId}`);
      } else {
        console.error("❌ Backend error:", data);
        alert(data.error || "Failed to process file.");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please check console for details.");
    } finally {
      setUploading(false);
    }
  };

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

          <label className="upload-box" htmlFor="cv-upload">
            <FileText size={22} />
            <span>Click to upload PDF or DOCX</span>
          </label>

          {/* Hidden input for file picker */}
          <input
            id="cv-upload"
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />

          <button
            className="btn-success"
            onClick={() => document.getElementById("cv-upload").click()}
            disabled={uploading}
          >
            {uploading ? "Processing..." : "Choose File"}
          </button>
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
          <button
            className="btn-primary"
            onClick={() => navigate("/start-fresh")}
          >
            Start Fresh
          </button>
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
