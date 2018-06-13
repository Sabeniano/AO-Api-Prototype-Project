import jwt from 'jsonwebtoken';

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
  },
  validate: (username, password) => {
    //  TODO:  validate user from DB
  },

  validateUser: (username) => {
  },
};

function generateToken(user){

}

function ExpiresIn(numOfDays){
  let currentDate = new Date();
  return currentDate.setDate(currentDate)
}