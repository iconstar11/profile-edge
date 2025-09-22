import React from 'react'
import './FormSection.css'

function ExperienceForm() {
    return (
        <div className='experience-form'>
            <div className="form-section">
                <h4>Work Experience</h4>
                {/* Dynamic list of experiences goes here */}
                <button className="add-btn">+ Add Experience</button>
            </div>
        </div>
    )
}

export default ExperienceForm