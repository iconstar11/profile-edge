import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig'; 
import { useNavigate } from 'react-router-dom';
import './UploadPage.css';

const UploadPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && (uploadedFile.type === "application/pdf" || 
        uploadedFile.type === "application/msword" || 
        uploadedFile.type.includes("wordprocessingml.document"))) {
      setFile(uploadedFile);
      setErrorMessage("");
    } else {
      setFile(null);
      setErrorMessage("Please upload a valid PDF or Word document.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!file) {
      alert("Please upload a file before submitting.");
      setIsSubmitting(false);
      return;
    }

    // Check if user is logged in
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
      console.log("Upload response:", data);

      // Navigate to PreviewPage with template and userCV data
      navigate("/previewpage", {
        state: {
          template: {
            defaultContent: {
              name: "John Doe", // Replace with extracted name from CV
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
          userCV: data.extractedText // Replace with actual CV data from backend
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
    <div className="upload-page">
      <h1>Upload Your Resume</h1>
      <p>Upload a PDF or Word document of your resume to get started.</p>
      <form onSubmit={handleSubmit} className='upload-form'>
        <div className="upload-box">
          <input
            type="file"
            accept=".pdf, .doc, .docx"
            id="fileInput"
            onChange={handleFileChange}
            disabled={isSubmitting}
          />
          <label htmlFor="fileInput">
            {file ? file.name : "Click to upload or drag and drop your file here"}
          </label>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Uploading...' : 'Submit'}
        </button>
      </form>
      <p className="skip-step">
        Don’t have a file? <a href="#">Create One</a>
      </p>
    </div>
  );
};

export default UploadPage;