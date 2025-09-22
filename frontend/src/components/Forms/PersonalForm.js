import React from 'react'

function PersonalForm() {
    return (
        <div className='personal-form'>
            <div className="form-section">
                <h4>Personal Info</h4>
                <input type="text" placeholder="Full Name" />
                <input type="email" placeholder="Email" />
                <input type="tel" placeholder="Phone" />
                <input type="text" placeholder="Location" />
                <textarea placeholder="Summary / About You" rows="3"></textarea>
            </div>
        </div>
    )
}

export default PersonalForm