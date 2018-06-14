import jwt from 'jsonwebtoken';
import config from '../config/config';

const auth = {
  login: (req, res) => {
    const username = req.body.username || '';
    const password = req.body.password || '';
    if (username === '' || password === '') {
      res.status(401).json({
        status: 401,
        message: 'Invalid Credentials'
      });
      return;
    }
    const dbUserObj = auth.validate(username, password);

    if (dbUserObj) {
      res.json(SignToken(dbUserObj));
    }
  },
  validate: (username, password) => {
    //  TODO:  validate user from DB
  },

  validateUser: (username) => {
    //  TODO: valdiate user from DB
  },
};

function SignToken(user){
  return jwt.sign({ id: foundUser._id }, config.secret, {
    expiresIn: 86400,
  });
}

export default = auth;