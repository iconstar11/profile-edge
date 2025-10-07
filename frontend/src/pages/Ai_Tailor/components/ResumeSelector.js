import React, { useEffect, useState, useContext } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import "./stylesTailorResume.css";
import { db } from "../../../firebase/firebaseConfig";
import { AuthContext } from "../../../firebase/AuthContext";

export default function ResumeSelector({ selected, onChange }) {
  const { currentUser } = useContext(AuthContext);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error("Error fetching resumes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="resume-card">
        <h2 className="section-title">Login Required</h2>
        <p className="section-subtitle">
          Please <a href="/login" className="login-link">log in</a> to upload or select your CV.
        </p>
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

  return (
    <div className="resume-card">
      <h2 className="section-title">Select Resume Version</h2>
      <p className="section-subtitle">Choose which resume to tailor</p>

      {resumes.length > 0 ? (
        <div className="resume-select-wrapper">
          <select
            className="resume-select"
            value={selected}
            onChange={(e) => onChange(e.target.value)}
          >
            {resumes.map((r) => (
              <option key={r.id} value={r.version}>
                {r.name} (v{r.version})
              </option>
            ))}
          </select>
          <small className="resume-updated">
            {resumes.find((r) => r.version === selected)?.updated ||
              "Last updated unknown"}
          </small>
        </div>
      ) : (
        <p className="no-resumes">No resumes found. Upload one to begin.</p>
      )}
    </div>
  );
}
