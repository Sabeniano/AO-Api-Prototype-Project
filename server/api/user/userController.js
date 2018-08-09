const User = require('./userModel');
const mongoose = require('mongoose');

const userController = {
  params: (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      const error = new Error();
      error.status = 404;
      error.resMessage = 'Invalid ID';
      next(error);
    } else {
      next();
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const foundUsers = await User.find({}, 'username email links employee');
      foundUsers.forEach((user) => {
        user.SetUpHyperLinks(req.headers.host, req.originalUrl);
      });
      const documents = {
        count: foundUsers.length,
        users: foundUsers,
      };
      if (documents.count > 0) {
        res.status(200).json(documents);
      } else {
        res.status(204).json(documents);
      }
    } catch (error) {
      next(error);
    }
  },
  getOneUser: async (req, res, next) => {
    try {
      const foundUser = await User.findOne({ _id: req.params.id }, 'username role email links employee').populate('employee', 'firstName lastName email phoneNumber links');
      foundUser.SetUpHyperLinks(req.headers.host, req.originalUrl);
      if (foundUser.employee) {
        foundUser.employee.SetUpHyperLinks(req.headers.host, '/api/v1/employee/');
      }
      res.status(200).json(foundUser);
    } catch (error) {                
      next(error);
    }
  },
  createOneUser: async (req, res, next) => {
    try {
      const foundUser = await User.findOne({ username: req.body.username }).lean();
      const foundEmail = await User.findOne({ email: req.body.email }).lean();
      if (foundUser) {
        return res.status(409).json({
          status: 409,
          message: 'Username already exists',
        });
      }
      if (foundEmail) {
        return res.status(409).json({
          status: 409,
          message: 'Email already exists',
        });
      }
      //  make sure role is capitalized first letter no matter whats entered
      const role = `${req.body.role.substring(0, 1).toUpperCase()}${req.body.role.substring(1, req.body.role.length).toLowerCase()}`;
      const newUser = {
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        role,
        password: req.body.password,
      };
      const createdUser = await User.create(newUser);
      createdUser.SetUpHyperLinks(req.headers.host, req.originalUrl);
      return res.status(201).json(createdUser.removePassword());
    } catch (error) {
      return next(error);
    }
  },

  updateOneUser: async (req, res, next) => {
    try {
      const updatedUser = await User
        .findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true, fields: 'username email links employee' });
      updatedUser.SetUpHyperLinks(req.headers.host, req.originalUrl);
      if (updatedUser.employee) {
        updatedUser.employee.SetUpHyperLinks(req.headers.host, '/api/v1/employee/');
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },

  deleteOneUser: async (req, res, next) => {
    try {
      await User.findOneAndRemove({ _id: req.params.id });
      res.status(200).json({ status: 200, message: 'Successfully deleted user' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
