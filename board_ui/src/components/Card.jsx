import React, { Component } from "react";
import "./Board.css";

export default function Card(card) {
  return <div className="green">{card.Description}</div>;
}
