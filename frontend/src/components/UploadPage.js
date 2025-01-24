import React, { useState } from 'react';
import './UploadPage.css';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && (uploadedFile.type === "application/pdf" || uploadedFile.type === "application/msword" || uploadedFile.type.includes("wordprocessingml.document"))) {
      setFile(uploadedFile);
      setErrorMessage("");
    } else {
      setFile(null);
      setErrorMessage("Please upload a valid PDF or Word document.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      console.log("File uploaded:", file.name); // Replace this with actual upload logic
      alert("File uploaded successfully!");
    } else {
      alert("Please upload a file before submitting.");
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
          />
          <label htmlFor="fileInput">
            {file ? file.name : "Click to upload or drag and drop your file here"}
          </label>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="submit-button">Submit</button>
      </form>
      <p className="skip-step">
        Don’t have a file? <a href="#">Create One</a>
      </p>
    </div>
  );
};

export default UploadPage;
