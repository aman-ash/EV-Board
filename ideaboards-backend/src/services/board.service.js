import Board from '../models/board.model';

//get all Board
export const getAllBoard = async (body) => {
  const data = await Board.find({ userid: body.userid });

  if (data === null) {
    throw new Error('no boards for the user');
  } else {
    return data;
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
