import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateCVPage.css";
import { Upload, FileText, Sparkles } from "lucide-react";
import CreateCVHeader from "../../components/CreateCVHeader";
import { auth } from "../../firebase/firebaseConfig";
import { BASE_URL } from "../../components/Shared/config";


const CreateCVPage = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

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

      const formData = new FormData();
      formData.append("uid", user.uid);
      formData.append("file", file);

      // ✅ Use local emulator URL for testing
      const response = await fetch(`${BASE_URL}/uploadAndExtractCV`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ CV successfully!");
        console.log("Extracted resume ID:", data.resumeId);
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
      <CreateCVHeader activeStep={1} />
      <div className="create-cv-header">
        <h2>Create Your Perfect CV</h2>
        <p>Choose how you'd like to get started with your CV creation</p>
      </div>

      <div className="cv-options">
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
            onClick={() => navigate("/createCv/start-fresh")}
          >
            Start Fresh
          </button>
        </div>

        <div className="cv-card">
          <div className="icon ai-icon">
            <Sparkles size={28} />
          </div>
          <h3>AI Interview</h3>
          <p>
            Our AI will conduct a friendly interview to understand your
            background and create a tailored CV.
          </p>
          <button className="btn-outline" onClick={() => navigate("/coming-soon")}>Start AI Interview</button>
        </div>
      </div>

      <p className="footer-note">
        All methods include AI-powered suggestions and ATS optimization
      </p>
    </div>
  );
};

export default CreateCVPage;
