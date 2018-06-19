import employeeControllerDebug from 'debug';
import mongoose from 'mongoose';
import Employee from './employeeModel';
import Job from '../job/jobModel';
import Wallet from '../wallet/walletModel';
import Schedule from '../schedule/scheduleModel';
import Workhours from '../workhours/workhoursModel';
import hlGenerator from '../../utils/hyperMediaLinkGenerator';
import emptyModelTemplateGenerator from '../../utils/emptyModelTemplates';
import sendError from '../../utils/sendError';

const debug = employeeControllerDebug('app:employeeController');

//  Gets all the data from the employeeModel and sends to employeeRouter
const employeeController = {
  FindResource: async (req, res) => {
    try {
      const foundEmployee = await Employee.find(req.query);
      if (foundEmployee.length > 0) {
        res.json(foundEmployee);
      } else {
        res.status(204).json([]);
      }
    } catch (error) {
      debug(error);
      sendError(500, 'Error proccesing the request', error);
    }
  },

  FindResourceById: async (req, res) => {
    try {
      const foundEmployee = await Employee.findById(req.params.id);
      if (foundEmployee) {
        res.status(200).json(foundEmployee);
      } else {
        res.status(204).json({});
      }
    } catch (error) {
      debug(error);
      sendError(500, 'Error proccesing the request', error);
    }
  },

  CreateResource: async (req, res) => {
    try {
      const newEmployee = {
        _id: mongoose.Types.ObjectId(),
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
        req.originalUrl
      );
      await Job.create(emptyModelTemplates.jobTemplate);
      await Wallet.create(emptyModelTemplates.walletTemplate);
      await Schedule.create(emptyModelTemplates.scheduleTemplate);
      await Workhours.create(emptyModelTemplates.workhoursTemplate);
      res.status(201).json(createdEmployee);
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },

  UpdateResource: async (req, res) => {
    try {
      //  TODO: set validation/checks
      const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedEmployee);
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },

  DeleteResource: async (req, res) => {
    try {
      await Employee.findByIdAndRemove(req.params.id);
      //  TODO: consider sending back a JSON with status and message
      res.status(200).json({ status: 200, message: 'Successfully deleted employee' });
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },
};

export default employeeController;
