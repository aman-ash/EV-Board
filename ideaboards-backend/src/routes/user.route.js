import express from 'express';
import * as userController from '../controllers/user.controller';
const router = express.Router();

//route to create a new user
router.post('/register', userController.newUser);
router.post('/login', userController.login);

export default router;
