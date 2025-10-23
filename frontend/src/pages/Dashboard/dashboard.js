import React, { useState, useEffect } from 'react';
import { Upload, FileText, Search, Download, Edit2, Trash2, TrendingUp, Bell, X } from 'lucide-react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { BASE_URL } from '../components/Shared/config';

const Dashboard = () => {
  // State for user data from Firestore
  const [userData, setUserData] = useState({
    firstName: 'John',
    tokens: 4,
    maxTokens: 7
  });
  const [uploading, setUploading] = useState(false);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  const navigate = useNavigate();

  // Dummy data for recent CVs
  const [recentCVs] = useState([
    {
      id: 1,
      title: 'Software Engineer CV',
      date: '2025-10-03',
      atsScore: 85,
      status: 'Optimized'
    },
    {
      id: 2,
      title: 'Product Manager Resume',
      date: '2025-10-01',
      atsScore: 72,
      status: 'Draft'
    },
    {
      id: 3,
      title: 'Data Analyst CV',
      date: '2025-09-28',
      atsScore: 90,
      status: 'Optimized'
    }
  ]);

  // Dummy notifications
  const [notifications] = useState([
    {
      id: 1,
      type: 'improvement',
      message: 'Your Software Engineer CV ATS score improved to 85%',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'reminder',
      message: 'You have 4 free CV generations remaining this month',
      time: '1 day ago'
    },
    {
      id: 3,
      type: 'tip',
      message: 'Add more keywords to improve your Product Manager resume',
      time: '2 days ago'
    }
  ]);

  // Simulate fetching data from Firestore
  useEffect(() => {
    // const fetchUserData = async () => {
    //   const docRef = doc(db, "users", userId);
    //   const docSnap = await getDoc(docRef);
    //   if (docSnap.exists()) {
    //     setUserData({
    //       firstName: docSnap.data().firstName,
    //       tokens: docSnap.data().tokens,
    //       maxTokens: 7
    //     });
    //   }
    // };
    // fetchUserData();
  }, []);

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
        // Show success popup
        setShowUploadSuccess(true);
        console.log("Extracted resume ID:", data.resumeId);
        
        // Auto-hide popup after 3 seconds
        setTimeout(() => {
          setShowUploadSuccess(false);
        }, 3000);
        
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

  const handleUploadClick = () => {
    document.getElementById("dashboard-cv-upload").click();
  };

  const handleQuickAction = (action) => {
    console.log(`${action} clicked`);
    // Implement navigation or action logic
  };

  const handleCVAction = (action, cvId) => {
    console.log(`${action} CV ${cvId}`);
    // Implement CV action logic
  };

  const tokenPercentage = (userData.tokens / userData.maxTokens) * 100;

  return (
    <div className="dashboard-container">
      {/* Upload Success Popup */}
      {showUploadSuccess && (
        <div className="upload-success-popup">
          <div className="popup-content">
            <div className="popup-icon">✅</div>
            <div className="popup-text">
              <h4>CV Uploaded Successfully!</h4>
              <p>Your resume has been processed and is ready to use.</p>
            </div>
            <button 
              className="popup-close"
              onClick={() => setShowUploadSuccess(false)}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        id="dashboard-cv-upload"
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />

      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>Welcome back, {userData.firstName}! 👋</h1>
        <p>Ready to create your perfect CV?</p>
      </div>

      {/* Token Usage Tracker */}
      <div className="token-tracker-card">
        <div className="token-header">
          <h3>Monthly CV Tokens</h3>
          <span className="token-count">{userData.tokens} / {userData.maxTokens}</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${tokenPercentage}%` }}
          ></div>
        </div>
        <p className="token-info">
          {userData.tokens > 0 
            ? `You have ${userData.tokens} free CV generations remaining this month`
            : 'No tokens remaining. Upgrade for more!'}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-grid">
          <button 
            className="action-btn primary"
            onClick={handleUploadClick}
            disabled={uploading}
          >
            <Upload size={24} />
            <span>{uploading ? "Uploading..." : "Upload CV 📄"}</span>
          </button>
          <button 
            className="action-btn primary"
            onClick={() => navigate("/input")}
          >
            <FileText size={24} />
            <span>Tailor CV ✏️</span>
          </button>
          <button 
            className="action-btn secondary"
            onClick={() => navigate("/jobs")}
          >
            <Search size={24} />
            <span>Search Jobs 🔍</span>
          </button>
        </div>
      </div>

      {/* Recent CVs */}
      <div className="recent-cvs">
        <h3>Recent CVs</h3>
        <div className="cv-list">
          {recentCVs.map(cv => (
            <div key={cv.id} className="cv-card">
              <div className="cv-info">
                <div className="cv-title-section">
                  <FileText size={20} className="cv-icon" />
                  <div>
                    <h4>{cv.title}</h4>
                    <small>{new Date(cv.date).toLocaleDateString()}</small>
                  </div>
                </div>
                <div className="cv-stats">
                  <span className={`status-badge ${cv.status.toLowerCase()}`}>
                    {cv.status}
                  </span>
                  <div className="ats-score">
                    <TrendingUp size={16} />
                    <span>ATS: {cv.atsScore}%</span>
                  </div>
                </div>
              </div>
              <div className="cv-actions">
                <button 
                  className="icon-btn"
                  onClick={() => handleCVAction('preview', cv.id)}
                  title="Preview"
                >
                  <FileText size={18} />
                </button>
                <button 
                  className="icon-btn"
                  onClick={() => handleCVAction('edit', cv.id)}
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  className="icon-btn"
                  onClick={() => handleCVAction('download', cv.id)}
                  title="Download"
                >
                  <Download size={18} />
                </button>
                <button 
                  className="icon-btn delete"
                  onClick={() => handleCVAction('delete', cv.id)}
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="notifications-section">
        <h3>
          <Bell size={20} />
          Notifications
        </h3>
        <div className="notification-list">
          {notifications.map(notification => (
            <div key={notification.id} className={`notification-item ${notification.type}`}>
              <div className="notification-content">
                <p>{notification.message}</p>
                <small>{notification.time}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;