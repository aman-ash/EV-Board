import express from 'express';
import * as boardController from '../controllers/board.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all board
router.get('/getAllBoard', userAuth, boardController.getAllBoard);

//route to get all board name and id
router.get('/getAllBoardName', userAuth, boardController.getAllBoardName);

//route to create a new board
router.post('/newBoard', userAuth, boardController.newBoard);

//route to get a board by id
router.get('/getBoard/:_id', userAuth, boardController.getBoard);

//route to add a card in board
router.patch('/addCard/:_id', userAuth, boardController.addCard);

router.patch('/deleteCard/:_id', userAuth, boardController.deleteCard);

export default router;
