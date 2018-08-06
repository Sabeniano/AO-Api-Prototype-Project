const mongoose = require('mongoose');
const crypto = require('crypto');
const Employee = require('./employeeModel');
const Job = require('../job/jobModel');
const Wallet = require('../wallet/walletModel');
const Workhours = require('../workhours/workhoursModel');
const User = require('../user/userModel');

const moment = require('moment-timezone');

console.log(moment());

process.env.TZ = 'Europe/Copenhagen'

console.log(moment().format());

function getTime() {
  return currentTime = new Date(moment().add(2, 'hours').format());
}

function getTimeZone() {
return nDate = new Date(moment().format()).toLocaleString('en-DK', {
  timeZone: 'Europe/Copenhagen'
});
}

console.log(getTime());
console.log(getTimeZone());

// console.log(moment().add(2, 'hours').format('DD/MM/YYYY h:mm:ss'));

const employeeController = {
  GetAllEmployees: async (req, res, next) => {
    try {
      const foundEmployees = await Employee.find(req.query, 'firstName lastName phoneNumber links');
      const documents = {
        count: foundEmployees.length,
        employees: foundEmployees,
      };
      if (documents.count > 0) {
        for (let i = 0; i < foundEmployees.length; i += 1) {
          foundEmployees[i].SetUpHyperLinks(req.headers.host, req.originalUrl);
        }
        res.status(200).json(documents);
      } else {
        res.status(204).json(documents);
      }
    } catch (error) {
      next(error);
    }
  },

  GetEmployeeById: async (req, res, next) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        const error = new Error();
        error.status = 404;
        error.resMessage = 'Invalid ID';
        next(error)
      }
      const foundEmployee = await Employee.findOne({ _id: req.params.id });
      if (foundEmployee) {
        foundEmployee.SetUpHyperLinks(req.headers.host, req.originalUrl);
        res.status(200).json(foundEmployee);
      } else {
        res.status(204).json({});
      }
    } catch (error) {
      next(error);
    }
  },

  CreateEmployee: async (req, res, next) => {
    try {
      const newEmployee = {
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        email: req.body.email,
        city: req.body.city,
        country: req.body.country,
        street: req.body.street,
        phoneNumber: req.body.phoneNumber,
        startDate: req.body.startDate,
        lastChanged: getTimeZone(),
      };
      
      //  consider giving option to add already created user
      const username = `${req.body.firstName.substring(0, 2)}${req.body.lastName.substring(0, 2)}${Math.floor((Math.random() * 1000) + 1)}`;
      const password = await crypto.randomBytes(12);
      const newUser = {
        _id: new mongoose.Types.ObjectId(),
        username,
        email: newEmployee.email,
        employee: newEmployee._id,
        password: password.toString('hex'),
      }
      newEmployee.user = newUser._id;
      const createdEmployee = await Employee.create(newEmployee);
      createdEmployee.SetUpHyperLinks(req.headers.host, req.originalUrl);
      await Job.create({
        _id: new mongoose.Types.ObjectId(),
        employee_id: createdEmployee._id,
      });
      await Wallet.create({
        _id: new mongoose.Types.ObjectId(),
        employee_id: createdEmployee._id,
      });
      await Workhours.create({
        _id: new mongoose.Types.ObjectId(),
        employee_id: createdEmployee._id,
      });
      await User.create(newUser);
      res.status(201).json(createdEmployee);
    } catch (error) {
      next(error);
    }
  },

  UpdateEmployee: async (req, res, next) => {
    try {
      req.body.lastChanged = new Date();
      const updatedEmployee = await Employee
        .findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
      updatedEmployee.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(updatedEmployee);
    } catch (error) {
      next(error);
    }
  },

  DeleteEmployee: async (req, res, next) => {
    try {
      await Employee.findOneAndRemove({ _id: req.params.id });
      res.status(200).json({ status: 200, message: 'Successfully deleted employee' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = employeeController;
