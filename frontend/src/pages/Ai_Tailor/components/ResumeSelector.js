import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../firebase/AuthContext";
import { db } from "../../../firebase/firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import "./stylesTailorResume.css";
import { auth } from "../../../firebase/firebaseConfig";
import { BASE_URL } from "../../../components/Shared/config";

export default function ResumeSelector({ selected, onChange }) {
  const { currentUser } = useContext(AuthContext);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Fetch resumes
  useEffect(() => {
    const fetchResumes = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "users", currentUser.uid, "resumes"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const resumeData = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().fileName || `Resume v${doc.data().version}`,
          updated: doc.data().createdAt
            ? new Date(doc.data().createdAt.toDate()).toLocaleDateString()
            : "Unknown",
          version: doc.data().version,
        }));
        setResumes(resumeData);

        // ✅ If selected resume not found, auto-select latest
        if (resumeData.length > 0) {
          const exists = resumeData.some((r) => r.id === selected);
          if (!exists && selected) {
            onChange(resumeData[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching resumes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [currentUser, selected, onChange]);

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

      const response = await fetch(`${BASE_URL}/uploadAndExtractCV`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ CV uploaded successfully!");
        console.log("Extracted resume ID:", data.resumeId);
        
        // Refresh the resumes list to show the newly uploaded resume
        await fetchResumes();
        
        // Optionally select the newly uploaded resume
        if (data.resumeId) {
          onChange(data.resumeId);
        }
      } else {
        console.error("❌ Backend error:", data);
        alert(data.error || "Failed to process file.");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please check console for details.");
    } finally {
      setUploading(false);
      // Reset the file input
      event.target.value = '';
    }
  };

  // Re-fetch resumes function
  const fetchResumes = async () => {
    if (!currentUser) return;

    try {
      const q = query(
        collection(db, "users", currentUser.uid, "resumes"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const resumeData = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().fileName || `Resume v${doc.data().version}`,
        updated: doc.data().createdAt
          ? new Date(doc.data().createdAt.toDate()).toLocaleDateString()
          : "Unknown",
        version: doc.data().version,
      }));
      setResumes(resumeData);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  const handleUploadClick = () => {
    document.getElementById("resume-upload").click();
  };

  if (!currentUser) {
    return (
      <div className="resume-card">
        <h2 className="section-title">Login Required</h2>
        <p className="section-subtitle">
          Please{" "}
          <a href="/login" className="login-link">
            log in
          </a>{" "}
          to upload or select your CV.
        </p>
        <button className="upload-btn disabled" disabled>
          Upload Resume
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="resume-card">
        <h2 className="section-title">Loading resumes...</h2>
      </div>
    );
  }

  const selectedResume = resumes.find((r) => r.id === selected);

  return (
    <div className="resume-card">
      <h2 className="section-title">Select Resume Version</h2>
      <p className="section-subtitle">Choose which resume to tailor</p>

      {resumes.length > 0 ? (
        <div className="resume-select-wrapper">
          <select
            className="resume-select"
            value={selected || (resumes[0]?.id || "")}
            onChange={(e) => onChange(e.target.value)}
          >
            {resumes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} (v{r.version})
              </option>
            ))}
          </select>
          <small className="resume-updated">
            {selectedResume
              ? selectedResume.updated
              : resumes[0]?.updated || "Last updated unknown"}
          </small>
        </div>
      ) : (
        <p className="no-resumes">No resumes found. Upload one to begin.</p>
      )}

      {/* Hidden file input */}
      <input
        id="resume-upload"
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />

      <button 
        className="upload-btn" 
        onClick={handleUploadClick}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "+ Upload Resume"}
      </button>

      {uploading && (
        <div className="upload-progress">
          <p>Processing your resume...</p>
        </div>
      )}
    </div>
  );
}