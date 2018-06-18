import employeeControllerDebug from 'debug';
import Employee from './employeeModel';
import hlGenerator from '../../utils/hyperMediaLinkGenerator';

const debug = employeeControllerDebug('app:employeeController');

//  Gets all the data from the employeeModel and sends to employeeRouter
const employeeController = {
  FindResource: async (req, res) => {
    try {
      const foundEmployee = await Employee.find(req.query);
      // Under this comment you can write down any route "names" found in api.js
      const endpoins = ['self', 'wallet', 'workhours', 'job'];
      // Calls Hateoas generator in "hyperMediaLinkGenerator" and creates an url link via parameters
      hlGenerator(foundEmployee, req.headers.host, req.originalUrl, endpoins);
      //  Fills the array with all the contents that coincides within the requested table
      if (foundEmployee.length > 0) {
        res.json(foundEmployee);
      } else {
        res.status(204).send('Could not find data');
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
      res.json(foundEmployee);
    } catch (error) {
      //  TODO: error handle better
      debug(error);
      res.status(500).send('Error proccesing the request');
    }
  },

  CreateResource: async (req, res) => {
    try {
      const createdEmployee = await Employee.create(req.body);
      const endpoins = ['self', 'wallet', 'workhours', 'job'];
      hlGenerator(createdEmployee, req.headers.host, req.originalUrl, endpoins);
      // TODO: create the other models as soon as employee is creaetd
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
