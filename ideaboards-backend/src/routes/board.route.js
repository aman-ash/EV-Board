import express from 'express';
import * as userController from '../controllers/board.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all board
router.get('/getAllBoard', userAuth, userController.getAllBoard);

//route to create a new board
router.post('/newBoard', userAuth, userController.newBoard);

//route to get a board by id
router.get('/getBoard/:_id', userAuth, userController.getBoard);

export default router;
