import React from "react";
import { useState } from "react";
import "./Home.css";
import PopupForm from "./PopupForm";
import bg1 from "./bg1.mp4";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div>
        
        <video className="video-component" src={bg1} autoPlay loop muted />

        <button
          className="openModalBtn"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Create
        </button>
        {modalOpen && <PopupForm setOpenModal={setModalOpen} />}
      </div>
    </>
  );
}
