import express from 'express';
import messageService from '../utils/messageService';
import userController from './userController';

const userRouter = express.Router();

userRouter.route('/')
  .get(userController.findAllUsers)
  .post(userController.createUser)
  .put(messageService(405, 'use /user/ID to update a single user'))
  .delete(messageService(405, 'use /user/ID to delete a single user'));

userRouter.route('/:userId')
  .get(userController.findUserById)
  .post(messageService(405, 'use /user to create a new single user'))
  .put(userController.updateUser)
  .delete(userController.deleteUser);

  export default userRouter;