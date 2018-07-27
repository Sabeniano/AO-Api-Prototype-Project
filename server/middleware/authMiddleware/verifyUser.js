const User = require('../../api/user/userModel');

function verifyUser() {
  return async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(401).json({
          status: 401,
          message: 'authorization failed',
        });
      }
      const authenticated = await user.authenticate(req.body.password);
      if (authenticated === false) {
        return res.status(401).json({
          status: 401,
          message: 'authorization failed',
        });
      }
      req.user = user;
      return next();
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = verifyUser;
