import React, { useState, useEffect } from "react";
import "./components/stylesTailorResume.css";
import JobDescriptionInput from "./components/JobDescriptionInput";
import ResumeSelector from "./components/ResumeSelector";
import TailoringOptions from "./components/TailoringOptions";
import CreditUsageCard from "./components/CreditUsageCard";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { extractKeywords, tailorResume } from "../../utils/api";
import { getAuth } from "firebase/auth";
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

  const auth = getAuth();

  // ✅ Fetch user resumes from Firestore
  useEffect(() => {
    const fetchResumes = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const resumesRef = collection(db, "users", user.uid, "resumes");
        const q = query(resumesRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const fetchedResumes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setResumes(fetchedResumes);

        // Default selection logic
        if (fetchedResumes.length > 0) {
          setSelectedResume(fetchedResumes[0].id);
        }
      } catch (err) {
        console.error("Error loading resumes:", err);
      }
    };

    fetchResumes();
  }, [auth]);

  // ✅ Extract keywords (public function)
  const handleExtractKeywords = async () => {
    if (!jobDesc.trim()) return setError("Please enter a job description first.");
    setError("");
    setSuccessMessage("");
    setLoading(true);
    try {
      const result = await extractKeywords(jobDesc);
      setKeywords(result.split(",").map((k) => k.trim()));
      setSuccessMessage("✅ Keywords extracted successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to extract keywords. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Tailor resume — now sends Firestore rawText
  const handleTailorResume = async () => {
    if (!jobDesc.trim() || !selectedResume) return;
    setError("");
    setSuccessMessage("");

    const user = auth.currentUser;
    if (!user) {
      setError("Please log in to tailor your resume.");
      return;
    }

    const selectedCV = resumes.find((r) => r.id === selectedResume);

    if (!selectedCV) {
      setError("Selected resume not found.");
      return;
    }

    if (!selectedCV.rawText) {
      setError("Resume file content (rawText) is missing. Please re-upload your resume.");
      return;
    }

    setLoading(true);
    try {
      // Send raw resume text, job description, and options to API
      const result = await tailorResume(selectedCV.rawText, jobDesc, options);
      console.log("Tailored Resume Result:", result);
      setSuccessMessage("🚀 Resume tailored successfully!");
      // navigate("/result", { state: { tailoredText: result } }); // optional
    } catch (err) {
      console.error(err);
      setError("Failed to tailor resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = !jobDesc.trim() || !selectedResume;

  // ✅ Page Layout
  return (
    <div className="tailor-page">
      <div className="left-column">
        <JobDescriptionInput value={jobDesc} onChange={setJobDesc} />

        {/* ✅ Updated Resume Selector — Firestore aware */}
        <ResumeSelector
          selected={selectedResume}
          onChange={setSelectedResume}
          onUpload={() => console.log("Upload Resume clicked")}
        />

        <TailoringOptions options={options} onChange={setOptions} />

        {/* ✅ Extract Keywords Button */}
        <button
          className="primary"
          onClick={handleExtractKeywords}
          disabled={!jobDesc.trim() || loading}
        >
          {loading ? "Extracting..." : "🔍 Extract Keywords"}
        </button>

        {/* ✅ Tailor Resume Button */}
        <button
          className={`primary ${isButtonDisabled || loading ? "disabled" : ""}`}
          onClick={handleTailorResume}
          disabled={isButtonDisabled || loading}
          style={{ marginTop: "1rem" }}
        >
          {loading ? "Tailoring..." : "🚀 Tailor My Resume"}
        </button>

        {/* ✅ Feedback */}
        {error && <p className="error-msg">{error}</p>}
        {successMessage && <p className="success-msg">{successMessage}</p>}

        {/* ✅ Display Keywords */}
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
            4. Click “Tailor My Resume” to generate a personalized version
          </p>
        </div>
      </div>
    </div>
  );
}
