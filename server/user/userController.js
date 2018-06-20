const user = require('./userModel');
const bcrypt = require('bcryptjs');

const userController = {

  Login: async (req, res) => {
    try {
      //  TODO:  use query to parameterize?
      const foundUsers = await user.findOne({ username: req.body.username });
      
    } catch (error) {
      //  TODO: error handle
      res.status(500).send('error proccessing the request');
    }
  },

  Register: async (req, res) => {
    try {
      const hashedPassword = bcrypt.hashSync(req.body.password, 8);
      //  TODO: maybe reconsider if sending user back is good?
      const newUser = await user.create({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
      });
      newUser.password = '';
      res.json(newUser);
    } catch (error) {
      //  TODO: Error handle
      res.statu(500).send('Error proccessing the request');
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await user.findByIdAndRemove(req.params.userId, 'username');
      res.json(deletedUser);
    } catch (error) {
      res.status(500).send('Couldnt remove user');
    }
  },
};


module.exports = userController;
