// src/pages/CV/EditCVPage.js

import React, { useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill default theme

import "./EditCVPage.css";
import { CVContext } from "../../../utils/CVContext";

const EditCVPage = () => {
  const { personalInfo, setPersonalInfo } = useContext(CVContext);

  return (
    <div className="edit-cv-page container">
      <div className="editor-panel card">
        <h2>Edit Your CV (Rich Text Editor)</h2>
        <ReactQuill
          theme="snow"
          value={personalInfo.editorContent || ""}
          onChange={(val) =>
            setPersonalInfo({ ...personalInfo, editorContent: val })
          }
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link"],
              ["clean"],
            ],
          }}
        />
      </div>

      <div className="preview-panel card">
        <h2>Live Preview</h2>
        <div
          className="cv-preview"
          dangerouslySetInnerHTML={{
            __html: personalInfo.editorContent || "<p>Your CV will appear here...</p>",
          }}
        />
      </div>
    </div>
  );
};

export default EditCVPage;
