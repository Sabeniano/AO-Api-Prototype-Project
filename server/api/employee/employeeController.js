import employeeControllerDebug from 'debug';
import employee from './employeeModel';
import hlGenerator from '../../utils/hyperMediaLinkGenerator';

const debug = employeeControllerDebug('app:employeeController');

//  Gets all the data from the employeeModel and sends to employeeRouter
const employeeController = {
  FindResource: async (req, res) => {
    try {
      const foundEmployee = await employee.find(req.query);
      // Under this comment you can write down any route "names" found in api.js
      const endpoins = ['self', 'wallet', 'workhours', 'job'];
      // Calls Hateoas generator in "hyperMediaLinkGenerator" and creates an url link via parameters
      hlGenerator(foundEmployee, req.headers.host, req.originalUrl, endpoins);
      //  Fills the array with all the contents that coincides within the requested table
      if (foundEmployee.length > 0) {
        res.json(foundEmployee);
      } else {
        res.send('Could not find data').status(204);
      }
    } catch (error) {
      debug(error);
      res.send('Error, could not find data').status(204);
    }
  },

  //  Gets the individual data from the employeeModel and sends to employeeRouter
  FindResourceById: async (req, res) => {
    try {
      const foundEmployee = await employee.findById(req.params.id);
      res.json(foundEmployee);
    } catch (error) {
      debug(error);
      res.send('The data you are looking for does not exist').status(204);
    }
  },

  CreateResource: async (req, res) => {
    try {
      const createEmployee = await employee.create(req.body);
      await employee.update(createEmployee);
      res.send('New data added').status(201);
    } catch (error) {
      debug(error);
      res.send('Error processing the request').status(409);
    }
  },

  UpdateResource: async (req, res) => {
    try {
      await employee.findByIdAndUpdate(req.params.id, req.body);
      res.send('New data updated').status(201);
    } catch (error) {
      res.send('Error processing the request').status(409);
    }
  },

  DeleteResource: async (req, res) => {
    try {
      await employee.remove({ _id: req.params.id });
      res.send('data deleted').status(200);
    } catch (error) {
      debug(error);
      res.send('Error processing the request').status(409);
    }
  },
};

export default employeeController;
