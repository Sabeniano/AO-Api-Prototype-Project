import express from 'express';
import messageService from '../utils/messageService';
import userController from './userController';

const userRouter = express.Router();

userRouter.route('/')
  .get(userController.Login)
  .post(userController.Register)
  .patch(messageService(405, 'Cannot update user'))
  .delete(messageService(405, 'Cannot delete user'));

  //  ?? unneccesary
// userRouter.route('/:userId')
//   .get(userController.findUserById)
//   .post(messageService(405, 'use /user to create a new single user'))
//   .put(userController.updateUser)
//   .delete(userController.deleteUser);

export default userRouter;
