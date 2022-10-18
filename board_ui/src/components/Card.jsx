import React, { Component } from "react";
import "./Board.css";

export default function Card(card) {
  return <div draggable className="green container-drag">{card.Description}</div>;
}
