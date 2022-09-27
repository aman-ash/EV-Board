import React, { useState } from "react";
import "./css/Home.css";
import Form from "./Form";

export default function Home() {
  const [isCount, setIsCount] = useState(false);
  const [showCreateButton, setShowCreateButton] = useState(true);

  const handleclick = () => {
    setIsCount(true);
    setShowCreateButton(false);
  };

  return (
    <>
      <div>
        {showCreateButton && (
          <button className="createButton" onClick={handleclick}>
            Create
          </button>
        )}

        {isCount && <Form />}
      </div>
    </>
  );
}
