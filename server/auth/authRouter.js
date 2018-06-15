import express from 'express';
import authController from './authController';

const authRouter = express.Router();

authRouter.route('/register')
  .post(authController.register);

authRouter.route('/logout')
  .get(authController.logout);

authRouter.route('/login')
  .post(authController.login);

export default authRouter;
