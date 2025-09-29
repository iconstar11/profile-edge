import React, { createContext, useState } from "react";

export const CVContext = createContext();

export const CVProvider = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState({});
  const [experiences, setExperiences] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [skills, setSkills] = useState([]);

  return (
    <CVContext.Provider
      value={{
        personalInfo,
        setPersonalInfo,
        experiences,
        setExperiences,
        educationList,
        setEducationList,
        skills,
        setSkills,
      }}
    >
      {children}
    </CVContext.Provider>
  );
};
