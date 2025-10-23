import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./components/stylesTailorResume.css";
import JobDescriptionInput from "./components/JobDescriptionInput";
import ResumeSelector from "./components/ResumeSelector";
import TailoringOptions from "./components/TailoringOptions";
import CreditUsageCard from "./components/CreditUsageCard";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { extractKeywords, tailorResume } from "../../utils/api";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase/firebaseConfig";

export default function TailorResumePage() {
  const [jobDesc, setJobDesc] = useState("");
  const [selectedResume, setSelectedResume] = useState("");
  const [resumes, setResumes] = useState([]);
  const [options, setOptions] = useState({
    keywords: true,
    ats: false,
    tone: "professional",
  });

  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();

  // ✅ Fetch resumes once the user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      try {
        const resumesRef = collection(db, "users", user.uid, "resumes");
        let q;
        try {
          q = query(resumesRef, orderBy("createdAt", "desc"));
        } catch {
          // Fallback if 'createdAt' is missing
          q = query(resumesRef);
        }

        const snapshot = await getDocs(q);
        const fetchedResumes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setResumes(fetchedResumes);

        // ✅ Default selection
        if (fetchedResumes.length > 0) {
          setSelectedResume(fetchedResumes[0].id);
        } else {
          setSelectedResume("");
        }
      } catch (err) {
        console.error("Error loading resumes:", err);
        setError("Failed to load resumes.");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // ✅ Tailor resume - UPDATED to navigate to results page
  const handleTailorResume = async () => {
    if (!jobDesc.trim() || !selectedResume) {
      setError("Please enter a job description and select a resume.");
      return;
    }
    
    setError("");
    setSuccessMessage("");

    const user = auth.currentUser;
    if (!user) {
      setError("Please log in to tailor your resume.");
      return;
    }

    const selectedCV = resumes.find((r) => r.id === selectedResume);

    if (!selectedCV) {
      setError("Selected resume not found. Try reloading the page.");
      return;
    }

    if (!selectedCV.rawText) {
      setError("Resume content missing. Please re-upload your resume.");
      return;
    }

    setLoading(true);
    try {
      const result = await tailorResume(selectedCV.rawText, jobDesc, options);
      // ✅ Navigate to results page with the actual tailored resume
      navigate("/tailor-resume", { 
        state: { 
          tailoredResume: result,
          jobDescription: jobDesc,
          originalResumeName: selectedCV.fileName || `Resume v${selectedCV.version}`
        } 
      });
      
    } catch (err) {
      console.error(err);
      setError("Failed to tailor resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = !jobDesc.trim() || !selectedResume;

  return (
    <div className="tailor-page">
      <div className="left-column">
        <JobDescriptionInput value={jobDesc} onChange={setJobDesc} />

        <ResumeSelector
          selected={selectedResume}
          onChange={setSelectedResume}
          resumes={resumes}
          onUpload={() => console.log("Upload Resume clicked")}
        />

        <TailoringOptions options={options} onChange={setOptions} />

        <button
          className={`primary ${isButtonDisabled || loading ? "disabled" : ""}`}
          onClick={handleTailorResume}
          disabled={isButtonDisabled || loading}
          style={{ marginTop: "1rem" }}
        >
          {loading ? "Tailoring..." : "🚀 Tailor My Resume"}
        </button>

        {error && <p className="error-msg">{error}</p>}
        {successMessage && <p className="success-msg">{successMessage}</p>}

        {keywords.length > 0 && (
          <div className="keywords-container">
            <h3>Top Keywords:</h3>
            <div className="keyword-list">
              {keywords.map((kw, i) => (
                <span key={i} className="keyword-chip">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="right-column">
        <CreditUsageCard credits={5} />
        <div className="howitworks-card">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            1. Paste your job description<br />
            2. Select which resume version to tailor<br />
            3. Choose tailoring options<br />
            4. Click "Tailor My Resume" to generate a personalized version
          </p>
        </div>
      </div>
    </div>
  );
}