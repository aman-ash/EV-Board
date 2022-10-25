import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { boardData } from "../DummyData";
import { GrChapterAdd } from "react-icons/gr";
// import { boardData } from "../DummyData";
import Navbar from "./Navbar";
import { useEffect } from "react";
import {
  createCard,
  deleteCard,
  getBoardById,
  updateCard,
} from "../service/boardServices";
import './Board1.css'

import { useParams } from "react-router-dom";
const lodash = require("lodash");

// ar sectionsDictionary = {};
// const cardsFromBackend = boardData.Cards;
// const sections = boardData.Sections;
// v
// sections.forEach((section) => {
//   sectionsDictionary[section] = {};
//   sectionsDictionary[section]["name"] = section;
//   sectionsDictionary[section]["items"] = [];
// });

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
    cardDescription: "",
  };

  const newCard = {
    cardId: "",
    sectionName: columnName,
    cardDescription: "",
    edit: false,
  };

  createCard(createCardBoardId, createCardBody)
    .then((resp) => {
      newCard.cardId = resp.data.data;
    })
    .catch((error) => {});

  console.log(newCard);

  console.log("newCards");
  const column = columns[columnName];
  console.log(column.items)
  column.items.forEach((item, index) => {
    if (item.cardDescription.length === 0) {
      newCard.cardId = item.id;
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
  console.log(cards)
  cards.forEach((card) => {
    if (card.cardId === itemId) {
      card.cardDescription = event.target.value;
    }
  });
  setCards(cards);
  var column = columns[columnName];
  column.items.forEach((item) => {
    if (item.cardId === itemId) {
      item.cardDescription = event.target.value;
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
    if (item.cardId === itemId) {
      column.items.splice(index, 1);
    }
  });

  const body = {
    cardId: itemId,
  };
  deleteCard(id, body)
    .then((resp) => {
      console.log(resp, "delete");
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
    if (item.cardId === itemId) {
      desc = item.cardDescription;
      if (item.edit === false) {
        item.edit = true;
      } else {
        item.edit = false;
        // if (item.cardDescription.length === 0) {
        //   column.items.splice(index, 1);
        // }
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
    if (item.cardId === itemId) {
      if (item.edit === true) {
        elementRendered = (
          <input
            className="card-input"
            style={{ backgroundColor: whichColor(column) }}
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
            value={item.cardDescription}
          />
        );
      } else {
        elementRendered = (
          <div className="card-description">{item.cardDescription}</div>
        );
      }
    }
  });
  return <div>{elementRendered}</div>;
};
const FilterCards = (filtertext, columns, setColumns, setBackup) => {
  if (filtertext.length !== 0) {
    var filteredCards = lodash.cloneDeep(columns);
    for (const [key, value] of Object.entries(columns)) {
      columns[key].items.forEach((card, index) => {
        if (card.cardDescription.includes(filtertext) === false) {
          const idx = filteredCards[key].items.findIndex(
            (card1) => card1.cardDescription === card.cardDescription
          );
          if (idx !== -1) {
            filteredCards[key].items.splice(idx, 1);
          }
        }
      });
    }
    setBackup(columns);
    setColumns(filteredCards);
  }
};
const onChangeFilterText = (
  e,
  setFiltertext,
  columns,
  setColumns,
  backup,
  setsubmitDisabled
) => {
  const filtertext = e.target.value;
  setFiltertext(filtertext);
  if (filtertext === "") {
    setColumns(backup);
    setsubmitDisabled(true);
  } else {
    setsubmitDisabled(false);
  }
};
const whichColor = (column) => {
  console.log(column)
  if (column.name === "A") {
    return "#47B5FF";
  }
  if (column.name === "B") {
    return "#256D85";
  }
  if (column.name === "C") {
    return "#06283D";
  }
  if (column.name === "D") {
    return "#47B5FF";
  }
};
const whichDragColor = (column) => {
  if (column.name === "A") {
    return "#47dfff";
  }
  if (column.name === "B") {
    return "#117697";
  }
  if (column.name === "C") {
    return "#0D2635";
  }
  if (column.name === "Four") {
    return "#47B5FF";
  }
};
function Test() {
  var obj = {};
  let id = useParams();

   var sectionsDictionary = {};
   var cardsFromBackend = [];
   var sections = {};
  const [boardData, setBoardData] = useState(obj);
  const [columns, setColumns] = useState(sectionsDictionary);
  const [backup, setBackup] = useState(sectionsDictionary);
  const [cards, setCards] = useState(cardsFromBackend);
  const [filtertext, setFiltertext] = useState("");
  const [submitDisabled, setsubmitDisabled] = useState(true);

   useEffect(() => {
     LoadBoard();
   }, []);
 // setBoardData(DummyData);
 // const boardData = DummyData;
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
  console.log(cards)
  // console.log("2")
  // console.log("1");
  //console.log(columns)
  //console.log(cardsFromBackend)

//   var sectionsDictionary = {};
// const cardsFromBackend = boardData.Cards;
// const sections = boardData.Sections;
// sections.forEach((section) => {
//   sectionsDictionary[section] = {};
//   sectionsDictionary[section]["name"] = section;
//   sectionsDictionary[section]["items"] = [];
// });
// cardsFromBackend.forEach((Card) => {
//   Card.edit = false;
//   sectionsDictionary[Card.SectionName]["items"].push(Card);
// });

  

  return (
    <>
      <Navbar name={true} sections={cards} />
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <input
          id="filter"
          className="form-control"
          type="text"
          placeholder="Type filter text"
          value={filtertext}
          onChange={(e) => {
            onChangeFilterText(
              e,
              setFiltertext,
              columns,
              setColumns,
              backup,
              setsubmitDisabled
            );
          }}
        />
        <button
          className="submit-ftr-txt-btn btn btn-outline-info"
          disabled={submitDisabled}
          onClick={() =>
            FilterCards(filtertext, columns, setColumns, setBackup)
          }
        >
          Filter
        </button>
        <div id="board-main">
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns, id)}
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div className="section" key={columnId}>
                  <h2 className="section-heading">{column.name}</h2>
                  <button
                    className="add-card-btn btn btn-secondary"
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
                    <i class="fa fa-plus"></i>
                  </button>
                  <div className="section-margin">
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              // background: snapshot.isDraggingOver
                              //   ? "lightblue"
                              //   : "lightgrey",
                              padding: 4,
                              width: 250,
                              minHeight: 500,
                            }}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.cardId}
                                  draggableId={item.cardId}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        className="board-card"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          position: "relative",
                                          userSelect: "none",
                                          padding: "16px",
                                          borderRadius: "10px",

                                          margin: "0 0 8px 0",
                                          minHeight: "50px",
                                          height: "100px",
                                          // backgroundColor: "red",
                                          backgroundColor: snapshot.isDragging
                                            ? whichDragColor(column)
                                            : whichColor(column),
                                          color: "white",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        <button
                                          className="delete-btn btn"
                                          onClick={() =>
                                            onClickDelete(
                                              column.name,
                                              item.cardId,
                                              columns,
                                              cards,
                                              setColumns,
                                              setCards,
                                              id
                                            )
                                          }
                                        >
                                          <i class="fa fa-trash"></i>
                                        </button>
                                        <button
                                          className="edit-btn btn"
                                          onClick={() =>
                                            onClickEdit(
                                              column.name,
                                              item.cardId,
                                              columns,
                                              cards,
                                              setColumns,
                                              setCards,
                                              id
                                            )
                                          }
                                        >
                                          <i class="fa fa-edit"></i>
                                        </button>
                                        {renderElement(
                                          column.name,
                                          item.cardId,
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
      </div>
    </>
  );
}

export default Test;
