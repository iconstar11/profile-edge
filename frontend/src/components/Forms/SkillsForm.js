import React from 'react'

function SkillsForm() {
    return (
        <div className='skills-form'>

            <div className="form-section">
                <h4>Skills</h4>
                <div className="skills-input">
                    <input type="text" placeholder="Enter a skill" />
                    <button className="add-btn skill-add">+ Add Skill</button>
                    <button className="optimize-bttn">✨ Get AI Suggestions</button>
                </div>
                <div className="skills-list">
                    {/* Skills will appear as chips here */}
                </div>
                
            </div>
        </div>
    )
}

export default SkillsForm