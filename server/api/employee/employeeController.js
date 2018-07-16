const mongoose = require('mongoose');
const Employee = require('./employeeModel');
const Job = require('../job/jobModel');
const Wallet = require('../wallet/walletModel');
const Schedule = require('../schedule/scheduleModel');
const Workhours = require('../workhours/workhoursModel');

const employeeController = {
  GetAllEmployees: async (req, res, next) => {
    try {
      const foundEmployees = await Employee.find(req.query, 'firstName lastName phoneNumber links');
      if (foundEmployees < 0 ) {
      }
      const documents = {
        count: foundEmployees.length,
        employees: foundEmployees,
      };
      if (documents.count > 0) {
        for (let i = 0; i < foundEmployees.length; i++) {
          foundEmployees[i].SetUpHyperLinks(req.headers.host, req.originalUrl)
        };
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
      const foundEmployee = await Employee.findOne({ _id: req.params.id });
      if (foundEmployee) {
        foundEmployee.SetUpHyperLinks(req.headers.host, req.originalUrl)
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
        street: req.body.country,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        startDate: req.body.startDate,
        lastChanged: req.body.lastChanged,
      };
      const createdEmployee = await Employee.create(newEmployee);
      createdEmployee.SetUpHyperLinks(req.headers.host, req.originalUrl);
      await Job.create({
        employee_id: createdEmployee._id,
      });
      await Wallet.create({
        employee_id: createdEmployee._id,
      });
      await Workhours.create({
        employee_id: createdEmployee._id,
      });
      res.status(201).json(createdEmployee);
    } catch (error) {
      next(error);
    }
  },

  UpdateEmployee: async (req, res, next) => {
    try {
      //  TODO: set validation/checks
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

module.exports =  employeeController;

