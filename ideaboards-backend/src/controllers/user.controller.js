import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to get all board available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllBoard = async (req, res, next) => {
  try {
    const data = await UserService.getAllBoard();
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
    const data = await UserService.getBoard(req.params._id);
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
    const data = await UserService.newBoard(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Board created successfully'
    });
  } catch (error) {
    next(error);
  }
};
