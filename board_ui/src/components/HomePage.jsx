import React, { Component } from 'react';
import "./HomePage.css";
function HomePage() {
    return (  
        
        <div> 
            <div>Welcome to Home Page </div>
            <div className="container2">
            <div class="typed-out">Plan Create Accelerate...</div>
            </div>
            <div className="options">
            <button id="option1" type="button" class="btn btn-outline-info">Login</button>
            <button id="option2" type="button" class="btn btn-outline-info">SignUp</button>
            </div>
        </div>  
    );
}

export default HomePage;