import React from "react";
import { useNavigate } from "react-router-dom";
import "./CreateCVHeader.css";

const steps = [
  { id: 1, label: "1 Choose Option", path: "/createCv" },
  { id: 2, label: "2 Edit & Customize", path: "/start-fresh" },
  { id: 3, label: "3 Preview & Export", path: "/preview" },
];

const CreateCVHeader = ({ activeStep }) => {
  const navigate = useNavigate();

  return (
    <div className="progress-steps">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div
            className={`step ${activeStep === step.id ? "active" : "clickable"}`}
            onClick={() => navigate(step.path)}
          >
            {step.label}
          </div>
          {index < steps.length - 1 && <div className="divider" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CreateCVHeader;
