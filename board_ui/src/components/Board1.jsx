import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { boardData } from "../DummyData";
import { GrChapterAdd } from "react-icons/gr";
import { v4 as uuid } from "uuid";



var sectionsDictionary = {};
const cardsFromBackend = boardData.Cards;
const sections = boardData.Sections;
sections.forEach(section => {
  sectionsDictionary[section] = {};
  sectionsDictionary[section]["name"] = section;
  sectionsDictionary[section]["items"] = []
})

cardsFromBackend.forEach(Card => {
  sectionsDictionary[Card.SectionName]["items"].push(Card);
})

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
  console.log(cards);
  const newId = cards.length+1; 
  const newCard = {
    id: newId.toString(),
    SectionName: columnName,
    Description: "",
  }
  const column = columns[columnName];
  column.items.forEach(item => {
    if (item.Description.length === 0) {
      console.log("True");
      return
    }
  });
  
  var copiedItems = [...column.items];
  copiedItems.push(newCard);

  setColumns({
    ...columns,
    [columnName]: {
      ...column,
      items:copiedItems,
    },
  });
  cards.push(newCard);
  setCards(cards);
}
const EditCard = (event, columnName, itemId, index, cards, setCards, columns, setColumns) => {
  
  console.log(`item.id:${itemId}`);
  console.log(`index:${index}`);
  console.log(cards);
  cards.forEach(card => {
    console.log(card);
    if (card.id === itemId) {
      card.Description = event.target.value;
    }
  })
  setCards(cards);
  var column = columns[columnName];
  column.items.forEach(item => {
    if (item.id === itemId) {
      item.Description = event.target.value;
    }
  });
  setColumns({
    ...columns,
    [columnName]: {
      ...column,
      items:column.items,
    },
  });
}

function Test() {
  const [columns, setColumns] = useState(sectionsDictionary);
  const [cards, setCards] = useState(cardsFromBackend);
  const [EditFormOpen, setEditFormOpen] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false)
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns,setColumns)}
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
              <h2 style={{color:"white"}}>{column.name}</h2>
              <button onClick={() => onClickAdd(column.name,columns,cards,setColumns,setCards)}><GrChapterAdd /></button>
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
                                    <input style={{
                                      width: 200,
                                      minHeight: 500,
                                      border: "#263B4A",
                                      userSelect: "none",
                                      padding: "0",
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: "#456C86",
                                      
                                      color: "white",
                                      
                                    }}   onChange={(event)=> EditCard(event,column.name,item.id,index,cards,setCards,columns,setColumns) } value={item.Description} />
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
