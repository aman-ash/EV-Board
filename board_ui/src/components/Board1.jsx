import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { DummyData } from "../DummyData";
import { GrChapterAdd } from "react-icons/gr";
import Navbar from "./Navbar";
import { useEffect } from "react";
import {
  createCard,
  deleteCard,
  getBoardById,
  updateCard,
} from "../service/boardServices";

import { useParams } from "react-router-dom";

const onDragEnd = (result, columns, setColumns, id) => {
  if (!result.destination) return;
  const { source, destination } = result;
  console.log(result, "result");

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    console.log(sourceColumn, "SourceColumn");
    console.log(destColumn, "DestColumn");
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    console.log(removed, "removed");
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });

    const body = {
      cardId: removed.id,
      sectionName: destColumn.name,
      cardDescription: removed.Description,
    };
    updateCard(id, body)
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {});
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};
const onClickAdd = (columnName, columns, cards, setColumns, setCards, id) => {
  const createCardBoardId = id;
  const createCardBody = {
    sectionName: columnName,
    cardDescription: "aman",
  };

  const newCard = {
    id: "",
    sectionName: columnName,
    Description: "",
    edit: false,
  };
  createCard(createCardBoardId, createCardBody)
    .then((resp) => {
      newCard.id = resp.data.data;
    })
    .catch((error) => {});

  console.log(newCard);

  console.log("newCrads");
  const column = columns[columnName];
  column.items.forEach((item, index) => {
    if (item.Description.length === 0) {
      newCard.id = item.id;
      column.items.splice(index, 1);
    }
    console.log(newCard);
  });

  var copiedItems = [...column.items];
  copiedItems.push(newCard);

  setColumns({
    ...columns,
    [columnName]: {
      ...column,
      items: copiedItems,
    },
  });
  cards.push(newCard);
  setCards(cards);
};
const EditCard = (
  event,
  columnName,
  itemId,
  index,
  cards,
  setCards,
  columns,
  setColumns
) => {
  cards.forEach((card) => {
    if (card.id === itemId) {
      card.Description = event.target.value;
    }
  });
  setCards(cards);
  var column = columns[columnName];
  column.items.forEach((item) => {
    if (item.id === itemId) {
      item.Description = event.target.value;
    }
  });
  setColumns({
    ...columns,
    [columnName]: {
      ...column,
      items: column.items,
    },
  });
};

const onClickDelete = (
  columnName,
  itemId,
  columns,
  cards,
  setColumns,
  setCards,
  id
) => {
  var column = columns[columnName];
  column.items.forEach((item, index) => {
    if (item.id === itemId) {
      column.items.splice(index, 1);
    }
  });

  const body = {
    cardId: itemId,
  };
  deleteCard(id, body)
    .then((resp) => {
      console.log(resp);
    })
    .catch((error) => {});

  setColumns({
    ...columns,
    [columnName]: {
      ...column,
      items: column.items,
    },
  });
};

const onClickEdit = (
  columnName,
  itemId,
  columns,
  cards,
  setColumns,
  setCards,
  id
) => {
  var column = columns[columnName];
  let desc = "";

  column.items.forEach((item, index) => {
    if (item.id === itemId) {
      desc = item.Description;
      if (item.edit === false) {
        item.edit = true;
      } else {
        item.edit = false;
        if (item.Description.length === 0) {
          column.items.splice(index, 1);
        }
      }
    }

    const body = {
      cardId: itemId,
      cardDescription: desc,
      sectionName: columnName,
    };
    updateCard(id, body)
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {});
  });
  setColumns({
    ...columns,
    [columnName]: {
      ...column,
      items: column.items,
    },
  });
};
const renderElement = (
  columnName,
  itemId,
  columns,
  cards,
  setColumns,
  setCards
) => {
  var column = columns[columnName];
  var elementRendered;
  column.items.forEach((item, index) => {
    if (item.id === itemId) {
      if (item.edit === true) {
        elementRendered = (
          <input
            style={{
              width: 200,
              minHeight: 500,
              border: "#263B4A",
              userSelect: "none",
              padding: "0",
              margin: "0 0 8px 0",
              minHeight: "50px",
              backgroundColor: "#456C86",

              color: "white",
            }}
            onChange={(event) =>
              EditCard(
                event,
                columnName,
                itemId,
                index,
                cards,
                setCards,
                columns,
                setColumns
              )
            }
            value={item.Description}
          />
        );
      } else {
        elementRendered = <div>{item.Description}</div>;
      }
    }
  });
  return <div>{elementRendered}</div>;
};

function Test() {
  var obj = {};
  let id = useParams();

  var sectionsDictionary = {};
  var cardsFromBackend = [];
  var sections = {};
  const [boardData, setBoardData] = useState(obj);
  const [columns, setColumns] = useState(sectionsDictionary);
  const [cards, setCards] = useState(cardsFromBackend);

  useEffect(() => {
    LoadBoard();
  }, []);

  const LoadBoard = async () => {
    const board = await getBoardById(id.id);
    setBoardData(board.data.data);

    cardsFromBackend = boardData.cards;
    sections = boardData.Sections;

    if (sections !== undefined) {
      sections.forEach((section) => {
        sectionsDictionary[section] = {};
        sectionsDictionary[section]["name"] = section;
        sectionsDictionary[section]["items"] = [];
      });
      setColumns(sectionsDictionary);
    }
    if (cardsFromBackend !== undefined) {
      cardsFromBackend.forEach((Card) => {
        Card.edit = false;
        sectionsDictionary[Card.sectionName]["items"].push(Card);
      });
      setCards(cardsFromBackend);
    }
  };
  console.log("1");

  return (
    <>
      <Navbar name={true} sections={cardsFromBackend} />

      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns, id)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={columnId}
              >
                <h2 style={{ color: "white" }}>{column.name}</h2>
                <button
                  onClick={() =>
                    onClickAdd(
                      column.name,
                      columns,
                      cards,
                      setColumns,
                      setCards,
                      id
                    )
                  }
                >
                  <GrChapterAdd />
                </button>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <button
                                        onClick={() =>
                                          onClickDelete(
                                            column.name,
                                            item.id,
                                            columns,
                                            cards,
                                            setColumns,
                                            setCards,
                                            id
                                          )
                                        }
                                        className="btn"
                                      >
                                        <i class="fa fa-trash"></i>
                                      </button>
                                      <button
                                        onClick={() =>
                                          onClickEdit(
                                            column.name,
                                            item.id,
                                            columns,
                                            cards,
                                            setColumns,
                                            setCards,
                                            id
                                          )
                                        }
                                        className="btn"
                                      >
                                        <i class="fa fa-edit"></i>
                                      </button>
                                      {renderElement(
                                        column.name,
                                        item.id,
                                        columns,
                                        cards,
                                        setColumns,
                                        setCards
                                      )}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
}

export default Test;
