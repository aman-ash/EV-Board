import React, { useState } from "react";
import "./css/Form.css";

export default function Form() {
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);
  const handleclick = (number) => {
    if (number === "three") {
      setThree(!three);
    }
  };

  return (
    <div className="notes-form">
      <form>
        <label>Title</label>
        <input type="text" />
        <label>Description</label>
        <input type="text" />
        <lable>Type</lable>
        <select
          onChange={(e) => {
            const num = e.target.value;
            console.log(num);
            handleclick(num);
          }}
        >
          <option value="two" selected>
            Two
          </option>
          <option value="three">Three</option>
        </select>
        <input />
        <input />
        {three && <input type="text" />}
      </form>
    </div>
  );
}
