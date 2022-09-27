import React from "react";
import "./css/Navbar.css";
import ev_logo from "./ev-logo.png";

export default function Navbar() {
  return (
    <nav>
      <h2>
        <img src={ev_logo} />
        Ev- Board
      </h2>

      <ul>
        <li>
          <a href="#">Login</a>
        </li>
      </ul>
    </nav>
  );
}
