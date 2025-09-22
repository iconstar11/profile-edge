import React from 'react'

function SkillsForm() {
    return (
        <div className='skills-form'>

            <div className="form-section">
                <h4>Skills</h4>
                <div className="skills-input">
                    <input type="text" placeholder="Enter a skill" />
                    <button className="add-btn">+ Add Skill</button>
                </div>
                <div className="skills-list">
                    {/* Skills will appear as chips here */}
                </div>
                <button className="optimize-btn">✨ Get AI Suggestions</button>
            </div>
        </div>
    )
}

export default SkillsForm