import Board from '../models/board.model';

//get all Board
export const getAllBoard = async () => {
  const data = await Board.find();
  return data;
};

//create new  Board
export const newBoard = async (body) => {
  const data = await Board.create(body);
  return data;
};

//get single Board
export const getBoard = async (id) => {
  const data = await Board.findById(id);
  return data;
};
