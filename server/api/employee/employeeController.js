import employeeControllerDebug from 'debug';
import employee from './employeeModel';

const debug = employeeControllerDebug('app:employeeController');

//  Takes a request and sends the correct data
const employeeController = {
  FindResource: async (req, res) => {
    try {
      const foundEmployee = await employee.find(req.query);
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

  //  Takes a request and sends the individual data
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
      res.send('Error processing the request').send(409);
    }
  },

  UpdateResource: async (req, res) => {
    try {
      await employee.findByIdAndUpdate(req.params.id, req.body);
      res.send('New data updated').status(201);
    } catch (error) {
      res.send('Error processing the request').send(409);
    }
  },

  DeleteResource: async (req, res) => {
    try {
      await employee.remove({ _id: req.params.id });
      res.send('data deleted').status(200);
    } catch (error) {
      debug(error);
      res.send('Error processing the request').send(409);
    }
  },
};

export default employeeController;
