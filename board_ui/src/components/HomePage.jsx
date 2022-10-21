import React, { Component } from "react";
import { useState } from "react";
import "./HomePage.css";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import PopupForm from "./PopupForm";
import BoardForm from "./BoardForm";
import Navbar from "./Navbar";
import { DummyData } from "../DummyData";
function HomePage(props) {
  const [RegFormOpen, setRegFormOpen] = useState(false);
  const [LoginFormOpen, setLoginFormOpen] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [boardFormOpen, setBoardFormOpen] = useState(false);
  const [showMyBoards, setShowMyBoards] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    defaultValues: {
      status: "",
      message: "",
    },
  });

  return (
    <>
      <Navbar name={showMyBoards} sections={DummyData.Cards} />
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
        {!showCreate && (
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
        )}
        {showCreate && (
          <div className="options">
            <button
              id="option1"
              type="button"
              className="btn btn-outline-info"
              onClick={() => {
                setBoardFormOpen(true);
              }}
            >
              Create
            </button>
          </div>
        )}
        {boardFormOpen && (
          <BoardForm setOpenModal={setBoardFormOpen} setId={props} />
        )}
        {RegFormOpen && (
          <RegistrationForm
            setOpenModal={setRegFormOpen}
            setSubmitted={setSubmitted}
            setErrorMessage={setErrorMessage}
          />
        )}
        {LoginFormOpen && (
          <LoginForm
            setOpenModal={setLoginFormOpen}
            setShowCreate={setShowCreate}
            setSubmitted={setSubmitted}
            setErrorMessage={setErrorMessage}
            setShowMyBoards={setShowMyBoards}
          />
        )}
        {isSubmitted && (
          <PopupForm setSubmitted={setSubmitted} errorMessage={errorMessage} />
        )}
      </div>
    </>
  );
}

export default HomePage;
