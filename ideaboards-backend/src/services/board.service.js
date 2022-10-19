import Board from '../models/board.model';
import { v4 as uuidv4 } from 'uuid';
//get all Board
export const getAllBoard = async (body) => {
  const data = await Board.find({ userid: body.userid });

  if (data === null) {
    throw new Error('no boards for the user');
  } else {
    return data;
  }
};

export const getAllBoardName = async (body) => {
  const data = await Board.find({ userid: body.userid });
  let temp = [];
  for (var i = 0; i < data.length; i++) {
    let currBoard = {
      boardName: data[i].boardName,
      boardId: data[i]._id
    };
    temp.push(currBoard);
  }
  if (data === null) {
    throw new Error('no boards for the user');
  } else {
    return temp;
  }
};

//create new  Board
export const newBoard = async (body) => {
  const data = await Board.create(body);
  return data;
};

//get single Board
export const getBoard = async (id, userid) => {
  const data = await board.findById({ _id: id, userid: userid });
  if (data === null) {
    throw new Error('board by this id do not exist');
  }
  return data;
};

// Add card to a board
export const addCard = async (id, body) => {
  const board = await Board.findById({ _id: id });
  if (board) {
    let currCard = board.cards;
    const newCard = {
      cardId: uuidv4(),
      sectionName: body.sectionName,
      cardDescription: body.cardDescription
    };
    currCard.push(newCard);

    const data = await Board.findOneAndUpdate(
      { _id: id },
      {
        cards: currCard
      },
      {
        new: true
      }
    );
    return data;
  } else {
    throw new Error('board by this boardid do not exist');
  }
};

export const deleteCard = async (id, body) => {
  const board = await Board.findById({ _id: id });
  if (board) {
    let currCard = board.cards;
    let tempCardHolder = [];
    for (var i = 0; i < currCard.length; i++) {
      console.log(currCard[i]);
      if (currCard[i].cardId !== body.cardId) {
        tempCardHolder.push(currCard[i]);
      }
    }

    const data = await Board.findOneAndUpdate(
      { _id: id },
      {
        cards: tempCardHolder
      },
      {
        new: true
      }
    );
    return data;
  } else {
    throw new Error('board by this boardid do not exist');
  }
};
