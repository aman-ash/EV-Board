import React from 'react'
import './PopForm.css'
export default function PopupForm({setSubmitted}) {
    return(
        <div className="alert alert-success alert-dismissible fade show" role="alert">
        <strong> Registered successfully!!!!.</strong>
         <button className='close-btn' onClick={() => {setSubmitted(false);}}>X</button>
        </div>
    )
}
