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

  // ✅ Fetch user resumes on load
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

        // Set default to Master Resume
        const master = fetchedResumes.find((r) => r.version === "master");
        if (master) setSelectedResume(master.name);
        else if (fetchedResumes.length > 0)
          setSelectedResume(fetchedResumes[0].name);
      } catch (err) {
        console.error("Error loading resumes:", err);
      }
    };

    fetchResumes();
  }, [auth]);

  // ✅ Extract keywords (public, no auth)
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

  // ✅ Tailor resume (requires login)
  const handleTailorResume = async () => {
    if (!jobDesc.trim() || !selectedResume) return;
    setError("");
    setSuccessMessage("");

    const user = auth.currentUser;

    if (!user) {
      setError("Please log in to tailor your resume.");
      return;
    }

    setLoading(true);
    try {
      const selectedCV = resumes.find((r) => r.name === selectedResume);
      const result = await tailorResume(selectedCV, jobDesc, options);
      console.log("Tailored Resume Result:", result);
      setSuccessMessage("🚀 Resume tailored successfully!");
      // navigate("/result", { state: { tailoredText: result } }); // optional navigation
    } catch (err) {
      console.error(err);
      setError("Failed to tailor resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Disable tailor button if fields missing
  const isButtonDisabled = !jobDesc.trim() || !selectedResume;

  return (
    <div className="tailor-page">
      <div className="left-column">
        <JobDescriptionInput value={jobDesc} onChange={setJobDesc} />

        {/* ✅ Dynamic Resume Selector */}
        <ResumeSelector
          selected={selectedResume}
          onChange={setSelectedResume}
          resumes={resumes}
        />

        <TailoringOptions options={options} onChange={setOptions} />

        {/* ✅ Extract Keywords Button */}
        <button
          className="extract-btn"
          onClick={handleExtractKeywords}
          disabled={!jobDesc.trim() || loading}
        >
          {loading ? "Extracting..." : "🔍 Extract Keywords"}
        </button>

        {/* ✅ Tailor Resume Button */}
        <button
          className={`tailor-btn ${isButtonDisabled || loading ? "disabled" : ""}`}
          onClick={handleTailorResume}
          disabled={isButtonDisabled || loading}
        >
          {loading ? "Tailoring..." : "🚀 Tailor My Resume"}
        </button>

        {/* ✅ Feedback Messages */}
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
