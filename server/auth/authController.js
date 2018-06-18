import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens
import bcrypt from 'bcryptjs';
import config from '../config/config';
import user from '../user/userModel';

const authController = {

  register: async (req, res) => {
    try {
      //  salt and hashes the password automatically
      const hashedPassword = bcrypt.hashSync(req.body.password, 8);

      const newUser = await user.create({
        username: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      if (newUser) {
        //  we sign the token based on id with our secret token
        const token = jwt.sign({ id: newUser._id }, config.secret, {
          expiresIn: 86400, // expires in 24 hours
        });
        res.status(200).send({ auth: true, token });
      }
    } catch (error) {
      res.status(500).send('There was a problem registering the user`.');
    }
  },

  logout: async (req, res) => {
    res.status(200).send({ auth: false, token: null });
  },

  login: async (req, res) => {
    try {
      const foundUser = await user.findOne({ username: req.body.username });

      if (!foundUser) {
        res.status(404).send('User not found');
        return;
      }
      const passwordIsValid = bcrypt.compareSync(req.body.password, foundUser.password);
      if (!passwordIsValid) {
        res.status(401).send({ auth: false, token: null });
        return;
      }

      const token = jwt.sign({ id: foundUser._id }, config.secret, {
        expiresIn: 86400,
      });

      res.status(200).send({ auth: true, token });
      return;
    } catch (error) {
      res.status(500).send('Error on the server.');
    }
  },

};

export default authController;
