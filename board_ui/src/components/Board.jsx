import React from "react";
import "./Board.css";
import ColumnsName from "./Columns";
import { boardData } from "../DummyData";

function getAllColumns(boardData) {
  const allColumns = {};
  boardData.Sections.forEach((section) => {
    allColumns[section] = [];
  });
  return allColumns;
}

function GetColumnsData(boardData) {
  const allColumnsData = getAllColumns(boardData);
  boardData.Cards.forEach((card) => {
    allColumnsData[card.SectionName].push(card);
  });
  return allColumnsData;
}

function SecondPage() {
  const columns = [];
  const columnsdata = GetColumnsData(boardData);

  boardData.Sections.forEach((section) => {
    columns.push(ColumnsName(section, columnsdata[section]));
  });
  return (
    <>
      <h1>{boardData.boardName}</h1>
      <div className="flex-parent">{columns}</div>
    </>
  );
}

export default SecondPage;
