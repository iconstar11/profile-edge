import React, { useState } from "react";

function SkillsForm() {
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState("");

  const addSkill = () => {
    const trimmed = input.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setInput(""); // clear input
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const addDummySuggestions = () => {
    const suggestions = ["React", "Node.js", "Python", "Teamwork"];
    const newSkills = suggestions.filter(
      (s) => !skills.includes(s) // block duplicates
    );
    setSkills([...skills, ...newSkills]);
  };

  return (
    <div className="skills-form">
      <div className="form-section">
        <h4>Skills</h4>
        <div className="skills-input">
          <input
            type="text"
            placeholder="Enter a skill"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSkill()}
          />
          <button className="add-btn skill-add" onClick={addSkill}>
            + Add Skill
          </button>
          <button className="optimize-bttn" onClick={addDummySuggestions}>
            ✨ Get AI Suggestions
          </button>
        </div>

        <div className="skills-list">
          {skills.map((skill, index) => (
            <div key={index} className="skill-chip">
              {skill}
              <span
                className="remove-skill"
                onClick={() => removeSkill(skill)}
              >
                ❌
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillsForm;
