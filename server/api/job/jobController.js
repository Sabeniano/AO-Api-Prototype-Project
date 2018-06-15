import employeeControllerDebug from 'debug';
import job from './jobModel';

const debug = employeeControllerDebug('app:employeeController');

const jobController = {
  FindResource: async (req, res) => {
    try {
      const foundJob = await job.find(req.params.jobId);
      res.json(foundJob);
    } catch (error) {
      debug(error);
      res.send('Error, could not find resource').status(204);
    }
  },

  CreateResource: async (req, res) => {
    try {
      const createJob = await job.create(req.body);
      await job.update(createJob);
      res.send('New data added').status(201);
    } catch (error) {
      debug(error);
      res.send('Error processing the request').status(409);
    }
  },

  UpdateResource: async (req, res) => {
    try {
      await job.findByIdAndUpdate(req.params.jobId, req.body);
      res.send('New data updated').status(201);
    } catch (error) {
      res.send('Error processing the request').status(409);
    }
  },

  DeleteResource: async (req, res) => {
    try {
      await job.remove({ _id: req.params.jobId });
      res.send('data deleted').status(200);
    } catch (error) {
      debug(error);
      res.send('Error processing the request').status(409);
    }
  },
};

export default jobController;
