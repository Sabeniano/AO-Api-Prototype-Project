import employeeControllerDebug from 'debug';
import workhours from './workhoursModel';

const debug = employeeControllerDebug('app:employeeController');

const workhoursController = {
  FindResource: async (req, res) => {
    try {
      const foundWorkhours = await workhours.find({ _Owner: req.params.workhoursId });
      res.json(foundWorkhours);
    } catch (error) {
      debug(error);
      res.send('Error, could not find resource').status(204);
    }
  },

  FindResourceById: async (req, res) => {
    try {
      const foundWorkhours = await workhours.findById(req.params.workhoursId);
      res.json(foundWorkhours);
    } catch (error) {
      debug(error);
      res.send('The resource you are looking for does not exist').status(204);
    }
  },

  UpdateResource: async (req, res) => {
    try {
      await workhours.findByIdAndUpdate(req.params.workhoursId, req.body);
      res.send('New data updated').status(201);
    } catch (error) {
      res.send('Error processing the request').status(409);
    }
  },
};

export default workhoursController;
