import React, { useState, useCallback } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { X } from 'react-feather';  
import './UploadPage.css';

const UploadPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (uploadedFile) => {
    if (uploadedFile && (
      uploadedFile.type === "application/pdf" || 
      uploadedFile.type === "application/msword" || 
      uploadedFile.type.includes("wordprocessingml.document")
    )) {
      setFile(uploadedFile);
      setErrorMessage("");
    } else {
      setFile(null);
      setErrorMessage("Please upload a valid PDF or Word document.");
    }
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!file) {
      alert("Please upload a file before submitting.");
      setIsSubmitting(false);
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to upload files.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          "X-User-Id": user.uid 
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Upload failed");
        return;
      }

      const data = await response.json();
      navigate("/preview", {
        state: {
          template: {
            defaultContent: {
              name: "John Doe",
              sections: [
                { title: "Experience", content: "Worked at XYZ Corp." },
                { title: "Education", content: "Graduated from ABC University" }
              ],
              colors: {
                primary: "#4CAF50",
                secondary: "#FFC107",
                textPrimary: "#212121",
                textSecondary: "#757575"
              }
            }
          },
          userCV: data.extractedText
        }
      });

    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("Error uploading file. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="upload-page dark-theme"> {/* Change to 'light-theme' if needed */}
      <h1>Upload Your Resume</h1>
      <p className="description">Upload a PDF or Word document of your resume to get started.</p>

      <form onSubmit={handleSubmit} className="upload-form">
        <div 
          className={`upload-box ${isDragging ? 'dragging' : ''}`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
        >
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            id="fileInput"
            onChange={(e) => handleFileChange(e.target.files[0])}
            disabled={isSubmitting}
          />
          <label htmlFor="fileInput">
            <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>

           {file ? (
            <div className="file-preview">
              <span className="file-name">{file.name}</span>
              <button 
                type="button" 
                className="remove-file"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                aria-label="Remove file"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <>
              <span>Click to upload or drag and drop</span>
              <span className="file-types">PDF or Word documents only</span>
            </>
          )}
        </label>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting || !file}
        >
          {isSubmitting ? 'Uploading...' : 'Submit'}
        </button>
      </form>

      <p className="skip-step">
        Don't have a file? <a href="#">Create One</a>
      </p>
    </div>
  );
};

export default UploadPage;