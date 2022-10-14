import React from "react";
import "./Navbar.css";
import ev_logo from "./ev-logo.png";

export default function Navbar() {
  return (
    <nav className="nav">
      <h5>
        <img src={ev_logo} alt={"EvLogo"} />
        Ev- Board
      </h5>
      <ul>
        <li>
          <a href="#">Login</a>
        </li>
      </ul>
    </nav>
  );
}
