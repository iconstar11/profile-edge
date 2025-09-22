import React from 'react'
import './FormSection.css'

function EducationForm() {
  return (
    <div className='education-form'>
      <div className="form-section">
        <h4>Education</h4>
        {/* Dynamic list of education entries goes here */}
        <button className="add-btn">+ Add Education</button>
      </div>
    </div>
  )
}

export default EducationForm