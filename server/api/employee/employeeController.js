const mongoose = require('mongoose');
const Employee = require('./employeeModel');
const Job = require('../job/jobModel');
const Wallet = require('../wallet/walletModel');
const Schedule = require('../schedule/scheduleModel');
const Workhours = require('../workhours/workhoursModel');
const hlGenerator = require('../../utils/hyperMediaLinkGenerator');
const emptyModelTemplateGenerator = require('../../utils/emptyModelTemplates');
const sendError = require('../../utils/sendError');

const employeeController = {
  FindResource: async (req, res, next) => {
    try {
      const foundEmployee = await Employee.find(req.query);
      if (foundEmployee.length > 0) {
        res.json(foundEmployee);
      } else {
        res.status(204).json([]);
      }
    } catch (error) {
      sendError(500, 'Error proccesing the request', error);
      next();
    }
  },

  FindResourceById: async (req, res, next) => {
    try {
      const foundEmployee = await Employee.findById(req.params.id);
      if (foundEmployee) {
        res.status(200).json(foundEmployee);
      } else {
        res.status(204).json({});
      }
    } catch (error) {
      sendError(500, 'Error proccesing the request', error);
      next();
    }
  },

  CreateResource: async (req, res, next) => {
    try {
      const newEmployee = {
        _id: req.body._id || mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        startDate: req.body.startDate,
        lastChanged: req.body.lastChanged,
        links: [],
      };
      const endpoints = ['self', 'wallet', 'workhours', 'job', 'schedule'];
      hlGenerator(newEmployee, req.headers.host, req.originalUrl, endpoints);
      const createdEmployee = await Employee.create(newEmployee);
      const emptyModelTemplates = emptyModelTemplateGenerator(
        createdEmployee._id,
        mongoose,
        req.headers.host,
        req.originalUrl,
      );
      await Job.create(emptyModelTemplates.jobTemplate);
      await Wallet.create(emptyModelTemplates.walletTemplate);
      await Schedule.create(emptyModelTemplates.scheduleTemplate);
      await Workhours.create(emptyModelTemplates.workhoursTemplate);
      res.status(201).json(createdEmployee);
    } catch (error) {
      sendError(500, 'Error processing the request', error);
      next();
    }
  },

  UpdateResource: async (req, res, next) => {
    try {
      //  TODO: set validation/checks
      const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedEmployee);
    } catch (error) {
      sendError(500, 'Error processing the request', error);
      next();
    }
  },

  DeleteResource: async (req, res, next) => {
    try {
      await Employee.findByIdAndRemove(req.params.id);
      //  TODO: consider sending back a JSON with status and message
      res.status(200).json({ status: 200, message: 'Successfully deleted employee' });
    } catch (error) {
      sendError(500, 'Error processing the request', error);
      next();
    }
  },
};

module.exports =  employeeController;

