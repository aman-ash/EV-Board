import React, { Component } from "react";
import { useState } from "react";
import "./HomePage.css";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";

function HomePage() {
  const [RegFormOpen, setRegFormOpen] = useState(false);
  const [LoginFormOpen, setLoginFormOpen] = useState(false);

  return (
    <div>
      <div className="container2">
        <div class="typed-out">Plan Create Accelerate...</div>
      </div>
      <div className="options">
        <button
          id="option1"
          type="button"
          class="btn btn-outline-info"
          onClick={() => {
            setLoginFormOpen(true);
          }}
        >
          Login
        </button>
        <button
          id="option2"
          type="button"
          class="btn btn-outline-info"
          onClick={() => {
            setRegFormOpen(true);
          }}
        >
          SignUp
        </button>
      </div>
      {RegFormOpen && <RegistrationForm setOpenModal={setRegFormOpen} />}
      {LoginFormOpen && <LoginForm setOpenModal={setLoginFormOpen} />}
    </div>
  );
}

export default HomePage;
