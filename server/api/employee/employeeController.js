import employeeControllerDebug from 'debug';
import employee from './employeeModel';

const debug = employeeControllerDebug('app:employeeController');

const employeeController = {
  FindResource: async (req, res) => {
    try {
      const foundEmployee = await employee.find(req.query);
      if (foundEmployee.length > 0) {
        res.json(foundEmployee);
      } else {
        res.status(204).send('Could not find data');
      }
    } catch (error) {
      debug(error);
      res.status(204).send('Error, could not find resource');
    }
  },

  FindResourceById: async (req, res) => {
    try {
      const foundEmployee = await employee.findById(req.params.id);
      res.json(foundEmployee);
    } catch (error) {
      debug(error);
      res.status(204).send('The resource you are looking for does not exist');
    }
  },

  CreateResource: async (req, res) => {
    try {
      const createEmployee = await employee.create(req.body);
      await employee.update(createEmployee);
      res.status(201).send('New employee added');
    } catch (error) {
      debug(error);
      res.sendStatus(409).send('Error processing the request');
    }
  },

  UpdateResource: async (req, res) => {
    try {
      await employee.findByIdAndUpdate(req.params.id, req.body);
      res.status(201).send('New employee updated');
    } catch (error) {
      res.sendStatus(409).send('Error processing the request');
    }
  },

  DeleteResource: async (req, res) => {
    try {
      await employee.remove({ _id: req.params.id });
      res.status(200).send('Employee deleted');
    } catch (error) {
      debug(error);
      res.sendStatus(409).send('Error processing the request');
    }
  },
};

export default employeeController;
