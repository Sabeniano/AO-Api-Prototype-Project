import employeeControllerDebug from 'debug';
import job from './jobModel';
import sendError from '../../utils/sendError';

const debug = employeeControllerDebug('app:employeeController');

const jobController = {
  FindResource: async (req, res) => {
    try {
      const foundJob = await job.find({ employee_id: req.params.id });
      res.json(foundJob);
    } catch (error) {
      debug(error);
      sendError(500, 'Error proccesing the request', error);
    }
  },

  UpdateResource: async (req, res) => {
    try {
      const updatedJob = await job.findByIdAndUpdate(req.params.jobId, req.body, { new: true });
      res.status(200).json(updatedJob);
    } catch (error) {
      debug(error);
      sendError(500, 'Error proccesing the request', error);
    }
  },
};

export default jobController;
