import React from "react";
import "./Navbar.css";
import ev_logo from "./EAGLEVIEW LOGO COLOR.svg";

const myBoards = [
  { id: 1, name: "board1" },
  { id: 2, name: "aman" },
  { id: 3, name: "board3" },
  { id: 4, name: "board4" },
  { id: 5, name: "board5" },
];

export default function Navbar() {
  return (
    <div className="nav">
      <h5 style={{ height: "8px" }}>
        <img src={ev_logo} alt={"EvLogo"} />
      </h5>
      <li class="nav-item-dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Your Boards
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          {myBoards.map((board) => {
            console.log(board.name);
            return (
              <a class="dropdown-item" href="#">
                {board.name}
              </a>
            );
          })}
        </div>
      </li>

      <button className="export-button">export</button>
    </div>
  );
}
