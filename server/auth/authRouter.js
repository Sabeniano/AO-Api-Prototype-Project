const authRouter = require('express').Router();
const authController = require('./authController');
const verifyUser = require('../middleware/authMiddleware/verifyUser');
const verifyToken = require('../middleware/authMiddleware/verifyToken');
const getFullUser = require('../middleware/authMiddleware/getFullUser');
const validationErrorHandler = require('../middleware/validationMiddleware/validationErrorHandler');
const validateAuthFields = require('../middleware/validationMiddleware/validateAuthFiellds');

const verifyTokenAndGetUser = [verifyToken(), getFullUser()];

authRouter.route('/signup')
  .post(validateAuthFields.createfields, validationErrorHandler(), authController.registerUser);

authRouter.route('/signin')
  .post(validateAuthFields.signinFields, validationErrorHandler(), verifyUser(), authController.signinUser);

authRouter.route('/me')
  .all(verifyTokenAndGetUser)
  .get(authController.viewCurrentUserUser)
  .patch(validateAuthFields.updatefields, validationErrorHandler(), authController.updateCurrentUser)
  .delete(authController.deleteCurrentUser);

module.exports = authRouter;
