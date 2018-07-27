const userRouter = require('express').Router();
const userController = require('./userController');
const MessageService = require('../../utils/messageService');
const validationErrorHandler = require('../../middleware/validationMiddleware/validationErrorHandler');
const validateUserFields = require('../../middleware/validationMiddleware/validateUserFields');

userRouter.route('/')
  .get(userController.getAllUsers)
  .post(validateUserFields.createfields, validationErrorHandler(), userController.createOneUser)
  .patch(MessageService(405, 'Use /users/id to update a user'))
  .delete(MessageService(405, 'Use /users/id to delete a user'));

userRouter.route('/:id')
  .get(userController.getOneUser)
  .post(MessageService(405, 'Use /users/ to create a user'))
  .patch(validateUserFields.updatefields, validationErrorHandler(), userController.updateOneUser)
  .delete(userController.deleteOneUser);

module.exports = userRouter;
