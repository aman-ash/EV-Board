import React from 'react'
import './PopForm.css'
export default function PopupForm({setSubmitted, errorMessage}) {
    console.log(errorMessage)
    return(
        <span className={(errorMessage.status === "200" || errorMessage.status === "201")? "alert-success": "alert-danger" }>
        <strong>{errorMessage.message}</strong>
         <button className='close-btn' onClick={() => {setSubmitted(false);}}>X</button>
        </span>
    )
}
