import React from 'react'
import './Forms.css'

const Forms = ({ type, formName, placeholder, value }) => {
    return (
        <div class="input-container">
            <label for={formName}>{formName}</label>
            <input type={type} id={formName} placeholder={placeholder} value={value} />
        </div>

    )
}

export default Forms
