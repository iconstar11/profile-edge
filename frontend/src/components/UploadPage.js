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

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!file) {
    alert("Please upload a file before submitting.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Upload failed:", errorData.error);
      alert("Failed to upload file: " + errorData.error);
      return;
    }

    const data = await response.json();
    console.log("Extracted Text:", data.text);
    alert("Text extraction successful! Check the console for results.");
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("Error uploading file. Please try again.");
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
