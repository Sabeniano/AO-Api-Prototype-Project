import employeeControllerDebug from 'debug';
import mongoose from 'mongoose';
import Employee from './employeeModel';
import Wallet from '../wallet/walletModel';
import Schedule from '../schedule/scheduleModel';
import Workhours from '../workhours/workhoursModel';
import hlGenerator from '../../utils/hyperMediaLinkGenerator';
import emptyModelTemplateGenerator from '../../utils/emptyModelTemplates';

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
      //  TODO: error handle better
      debug(error);
      res.status(500).send('Error proccesing the request');
    }
  },

  //  Gets the individual data from the employeeModel and sends to employeeRouter
  FindResourceById: async (req, res) => {
    try {
      const foundEmployee = await Employee.findById(req.params.id);
      if (foundEmployee) {
        res.status(200).json(foundEmployee);
      } else {
        res.status(204).json({});
      }
    } catch (error) {
      //  TODO: error handle better
      debug(error);
      res.status(500).send('Error proccesing the request');
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
      }
      const endpoints = ['self', 'wallet', 'workhours', 'job', 'schedule'];
      hlGenerator(newEmployee, req.headers.host, req.originalUrl, endpoints);
      const createdEmployee = await Employee.create(newEmployee);
      // TODO: create the other models as soon as employee is creaetd

      const emptyModelTemplates = emptyModelTemplateGenerator(createdEmployee._id, mongoose);
      await Wallet.create(emptyModelTemplates.walletTemplate);
      await Schedule.create(emptyModelTemplates.scheduleTemplate);
      await Workhours.create(emptyModelTemplates.workhoursTemplate);
      res.status(201).json(createdEmployee);
    } catch (error) {
      //  TODO: error handle better
      debug(error);
      res.status(500).send('Error processing the request');
    }
  },

  UpdateResource: async (req, res) => {
    try {
      //  TODO: set validation/checks
      const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedEmployee);
    } catch (error) {
      res.status(500).send('Error processing the request');
    }
  },

  DeleteResource: async (req, res) => {
    try {
      await Employee.findByIdAndRemove(req.params.id);
      //  TODO: consider sending back a JSON with status and message
      res.send('data deleted').status(200);
    } catch (error) {
      debug(error);
      res.send('Error processing the request').status(500);
    }
  },
};

export default employeeController;
