import express from 'express';
import * as userController from '../controllers/user.controller';

const router = express.Router();

//route to get all board
router.get('/getAllBoard', userController.getAllBoard);

//route to create a new board
router.post('/newBoard', userController.newBoard);

//route to get a board by id
router.get('/getBoard/:_id', userController.getBoard);

export default router;
