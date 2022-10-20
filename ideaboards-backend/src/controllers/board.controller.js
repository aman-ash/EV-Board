import HttpStatus from 'http-status-codes';
import * as boardService from '../services/board.service';

/**
 * Controller to get all board available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllBoard = async (req, res, next) => {
  try {
    const data = await boardService.getAllBoard(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All Board fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get all board name and id
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllBoardName = async (req, res, next) => {
  try {
    const data = await boardService.getAllBoardName(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All Board fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Controller to get a single board
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getBoard = async (req, res, next) => {
  try {
    const data = await boardService.getBoard(req.params._id, req.body.userid);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Board fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new Board
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newBoard = async (req, res, next) => {
  try {
    const data = await boardService.newBoard(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Board created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to add a  a new card in the board
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addCard = async (req, res, next) => {
  try {
    const data = await boardService.addCard(req.params._id, req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'card Added  successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a  card in the board
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteCard = async (req, res, next) => {
  try {
    const data = await boardService.deleteCard(req.params._id, req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'card Added  successfully'
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Controller to update a  card in the board
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateCard = async (req, res, next) => {
  try {
    const data = await boardService.updateCard(req.params._id, req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'card Updated successfully'
    });
  } catch (error) {
    next(error);
  }
};
