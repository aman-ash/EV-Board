import React from "react";
import { useState } from "react";
import "./Home.css";
import PopupForm from "./PopupForm";
import bg1 from "./bg1.mp4";
import RegistrationForm from "./RegistrationForm";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [RegFormOpen, setRegFormOpen] = useState(false)
  

  return (
    <>
      <div>
        
        <video className="video-component" src={bg1} autoPlay loop muted />

        {/* <button
          className="openModalBtn"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Create
        </button> */}

        <button
          className="openModalBtn"
          onClick={() => {
            setRegFormOpen(true);
          }}
        >
          Register
        </button>

        {RegFormOpen && <RegistrationForm setOpenModal={setRegFormOpen}/>}
        {modalOpen && <PopupForm setOpenModal={setModalOpen} />}
      </div>
    </>
  );
}
