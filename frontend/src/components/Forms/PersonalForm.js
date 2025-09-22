import React from 'react'
import './FormSection.css'

function PersonalForm() {
    return (
        <div className='personal-form'>
            <div className="form-section">
                <h4>Personal Info</h4>
                <div className=''>
                <input type="text" placeholder="Full Name" />
                <input type="email" placeholder="Email" />
                <input type="tel" placeholder="Phone" />
                <input type="text" placeholder="Location" />
                </div>
                <textarea placeholder="Summary / About You" rows="3"></textarea>
            </div>
        </div>
    )
}

export default PersonalForm