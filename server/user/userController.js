import user from './userModel';

const userController = {

  findAllUsers: async (req, res) => {
    try {
      //  TODO:  use query to parameterize?
      const allUsers = await user.find({});
      if (allUsers.length > 0) {
        res.json(allUsers);
      } else {
        res.status(204).send('No users found');
      }
    } catch (error) {
      //  TODO: error handle
      res.status(500).send('error proccessing the request');
    }
  },

  createUser: async (req, res) => {
    try {
      const newUser = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      //  TODO: maybe reconsider if sending user back is good?
      delete newUser.password;
      res.json(newUser);
    } catch (error) {
      //  TODO: Error handle
      res.statuc(500).send('Error proccessing the request');
    }
  },
  findUserById: async (req, res) => {
    try {
      const foundUser = await user.find({ _id: req.params.userId });
      res.json(foundUser);
    } catch (error) {
      //  TODO: error handle
      res.status(500).send('Error proccessing the request');
    }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await user.findByIdAndUpdate(req.params.userId, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).send('Could not update the user');
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


export default userController;
