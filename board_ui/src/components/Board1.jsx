import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { boardData } from "../DummyData";
import { GrChapterAdd } from "react-icons/gr";
import { v4 as uuid } from "uuid";
const lodash = require("lodash");

var sectionsDictionary = {};
const cardsFromBackend = boardData.Cards;
const sections = boardData.Sections;
sections.forEach((section) => {
  sectionsDictionary[section] = {};
  sectionsDictionary[section]["name"] = section;
  sectionsDictionary[section]["items"] = [];
});

cardsFromBackend.forEach((Card) => {
  Card.edit = false;
  sectionsDictionary[Card.SectionName]["items"].push(Card);
});

const onDragEnd = (result, columns, setColumns) => {
  console.log(result);
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
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
const onClickAdd = (columnName, columns, cards, setColumns, setCards) => {
  const newId = cards.length + 1;
  const newCard = {
    id: newId.toString(),
    SectionName: columnName,
    Description: "",
    edit: false,
  };
  const column = columns[columnName];
  column.items.forEach((item, index) => {
    console.log(item);
    if (item.Description.length === 0) {
      newCard.id = item.id;
      column.items.splice(index, 1);
    }
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
  console.log(`item.id:${itemId}`);
  console.log(`index:${index}`);
  console.log(cards);
  cards.forEach((card) => {
    console.log(card);
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
  setCards
) => {
  var column = columns[columnName];
  column.items.forEach((item, index) => {
    if (item.id === itemId) {
      column.items.splice(index, 1);
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

const onClickEdit = (
  columnName,
  itemId,
  columns,
  cards,
  setColumns,
  setCards
) => {
  console.log("Edit button clicked");
  console.log(cards);
  var column = columns[columnName];
  column.items.forEach((item, index) => {
    if (item.id === itemId) {
      if (item.edit === false) {
        item.edit = true;
      } else {
        item.edit = false;
        if (item.Description.length === 0) {
          column.items.splice(index, 1);
        }
      }
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
const FilterCards = (filtertext, columns, setColumns, setBackup) => {
  if (filtertext.length !== 0) {
    var filteredCards = lodash.cloneDeep(columns);
    for (const [key, value] of Object.entries(columns)) {
      columns[key].items.forEach((card, index) => {
        if (card.Description.includes(filtertext) === false) {
          console.log(`${card.Description} doesn't contain ${filtertext}`);
          const idx = filteredCards[key].items.findIndex(
            (card1) => card1.Description === card.Description
          );
          console.log(`idx:${idx}`);
          if (idx !== -1) {
            filteredCards[key].items.splice(idx, 1);
          }
        } else {
          console.log(`${card.Description} contains ${filtertext}`);
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
    console.log("True");
    console.log(columns);
    setColumns(backup);
    setsubmitDisabled(true);
  } else {
    setsubmitDisabled(false);
  }
};

function Test() {
  const [columns, setColumns] = useState(sectionsDictionary);
  const [backup, setBackup] = useState(sectionsDictionary);
  const [cards, setCards] = useState(cardsFromBackend);
  const [filtertext, setFiltertext] = useState("");
  const [submitDisabled, setsubmitDisabled] = useState(true);
  console.log(columns);
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <input
        id="filter"
        style={{ height: "20px", position: "absolute", left: "0px" }}
        type="textarea"
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
        style={{
          height: "20px",
          position: "absolute",
          left: "150px",
          color: "white",
        }}
        className="btn"
        disabled={submitDisabled}
        onClick={() => FilterCards(filtertext, columns, setColumns, setBackup)}
      >
        Filter
      </button>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
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
                  onClickAdd(column.name, columns, cards, setColumns, setCards)
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
                                          setCards
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
                                          setCards
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
  );
}

export default Test;
