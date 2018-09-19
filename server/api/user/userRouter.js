const userRouter = require('express').Router();
const c = require('../../utils/controllerHandler');
const p = require('../../utils/paramHandler');
const MessageService = require('../../utils/messageService');
const validateFields = require('../../middleware/validationMiddleware/userControllerValidation');
const validationErrorHandler = require('../../middleware/validationMiddleware/validationErrorHandler');
const userExists = require('../../middleware/authMiddleware/userExists');
const {
  getAllUsers,
  getOneUser,
  createOneUser,
  updateOneUser,
  deleteOneUser,
} = require('./userController');

userRouter.param('id', p(req => req.params.id));

userRouter.route('/')
  .get(c(getOneUser, req => [req.query, req.headers.host, req.originalUrl]))
  .post(
    validateFields.createfields,
    validationErrorHandler(),
    userExists(),
    c(createOneUser, req => [req.body, req.headers.host, req.originalUrl]),
  )
  .patch(MessageService(405, 'Use /users/id to update a user'))
  .delete(MessageService(405, 'Use /users/id to delete a user'));

userRouter.route('/:id')
  .get(c(getOneUser, req => [req.params.id, req.headers.host, req.originalUrl]))
  .post(MessageService(405, 'Use /users/ to create a user'))
  .patch(
    validateFields.updatefields,
    validationErrorHandler(),
    c(updateOneUser, req => [req.body, req.params.id, req.headers.host, req.originalUrl]),
  )
  .delete(c(deleteOneUser, req => [req.params.id]));

module.exports = userRouter;
