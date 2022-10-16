import React from "react";
import "./Board.css";
import Card from "./Card";

export default function ColumnsName(name, columnData) {
  const cards = [];
  columnData.forEach((card) => {
    cards.push(Card(card));
  });
  return (
    <>
      <div className="flex-child">
        <div className="title-column">{name}</div>

        <div class="break"></div>

        {cards}
      </div>
    </>
  );
}
