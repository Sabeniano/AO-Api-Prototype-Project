const authRouter = require('express').Router();
const authController = require('./authController');
const verifyUser = require('../middleware/authMiddleware/verifyUser');
const verifyFields = require('../middleware/authMiddleware/verifyFields');
const verifyToken = require('../middleware/authMiddleware/verifyToken');
const getFullUser = require('../middleware/authMiddleware/getFullUser');

const verifyTokenAndGetUser = [verifyToken(), getFullUser()];

authRouter.route('/signup')
  .post(verifyFields(), authController.registerUser);

authRouter.route('/signin')
  .post(verifyUser(), authController.signinUser);

authRouter.route('/me')
  .all(verifyTokenAndGetUser)
  .get(authController.viewCurrentUserUser)
  .patch(authController.updateCurrentUser)
  .delete(authController.deleteCurrentUser);

module.exports = authRouter;
