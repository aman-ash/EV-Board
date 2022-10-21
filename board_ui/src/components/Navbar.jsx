import React from "react";
import "./Navbar.css";
import ev_logo from "./ev-logo.png";
import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts";

import { getAllBoardsName } from "../service/boardServices";
import { useEffect } from "react";
import { useState } from "react";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Navbar(showBoards) {

  const [boardData, setBoardData] = useState([])

  useEffect(() => {
   getBoardsdata();
  }, []);
  
  const getBoardsdata =  async () =>{
    const boards = await getAllBoardsName();
    const arr = [];
    Object.entries(boards.data.data).forEach(([key, board]) => {
      arr.push(board);
    });
    setBoardData(arr)
  }


  const array = ["1", "3"];
  const document = {
    content: [
      {
        text: "Cards",
        fontStyle: 20,
        lineHeight: 2,
        color: "Black",
        fontsize: 22,
        itemsalign: "center",
      },
    ],
  };
  Object.entries(showBoards.sections).forEach((card) => {
    document.content.push({
      columns: [
        { text: "Section", width: 60, color: "#454545" },
        { text: ":", width: 10 },
        { text: card[1].SectionName, width: 50, color: "#808080" },
        { text: "Description", width: 80, color: "#454545" },
        { text: ":", width: 10 },
        { text: card[1].Description, width: 1000, color: "#808080" },
      ],
      lineHeight: 2,
    });
  });
  const handleClick = () => {
    pdfMake.createPdf(document).download();
  };
  return (
    <div className="nav">
      <h5>
        <img src={ev_logo} alt={"EvLogo"} />
        Ev- Board
      </h5>
      <li class="nav-item-dropdown">
        {showBoards.name && (
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
        )}

        <span class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          {boardData.map((board) => {
            return (
              <a class="dropdown-item" href="#" key={board.boardId}>
                {board.boardName}
              </a>
            );
          })}
        </span>
      </li>

      {showBoards.name && (
        <button onClick={handleClick} className="export-button">
          export
        </button>
      )}
    </div>
  );
}
