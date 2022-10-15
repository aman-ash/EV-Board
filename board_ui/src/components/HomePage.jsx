import React, { Component } from "react";
import { useState } from "react";
import "./HomePage.css";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import PopupForm from "./PopupForm";

function HomePage() {
  const [RegFormOpen, setRegFormOpen] = useState(false);
  const [LoginFormOpen, setLoginFormOpen] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false)
  const props = {setRegFormOpen, setSubmitted}
  return (
      <div>
           <div className="container"> 
    <div className="main"></div> 
    <div>
     
      <div class="moon">
          <div className="crater crater-1"></div>
          <div className="crater crater-2"></div>
          <div className="crater crater-3"></div>
          <div className="crater crater-4"></div>
          <div className="crater crater-5"></div>
          <div className="shadow"></div>
          <div className="eye eye-l"></div>
          <div className="eye eye-r"></div>
          <div className="mouth"></div>
          <div className="blush blush-1"></div>
          <div className="blush blush-2"></div>
      </div>
      <div className="orbit">
          <div className="rocket">
              <div className="window"></div>
          </div>
      </div>
      <div className="orbit">
          <div className="rocket">
              <div className="window"></div>
          </div>
      </div>
      <div className="orbit">
          <div className="rocket">
              <div className="window"></div>
          </div>
      </div>
  </div>
   
    </div>
      <div className="container2">
        <div className="typed-out">Plan Create Accelerate...</div>
      </div>
      <div className="options">
        <button
          id="option1"
          type="button"
          className="btn btn-outline-info"
          onClick={() => {
            setLoginFormOpen(true);
          }}
        >
          Login
        </button>
        <button
          id="option2"
          type="button"
          className="btn btn-outline-info"
          onClick={() => {
            setRegFormOpen(true);
          }}
        >
          SignUp
        </button>
      </div>
      {RegFormOpen && <RegistrationForm setOpenModal={setRegFormOpen} setSubmitted={setSubmitted}/>}
      {LoginFormOpen && <LoginForm setOpenModal={setLoginFormOpen} />}
      {isSubmitted && <PopupForm setSubmitted={setSubmitted}/>}
    </div>
  );
}

export default HomePage;
