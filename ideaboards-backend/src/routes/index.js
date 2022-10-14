import express from 'express';
const router = express.Router();

import boardRoute from './board.route';
import userRoute from './user.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/boards', boardRoute);
  router.use('/users', userRoute);
  return router;
};

export default routes;
