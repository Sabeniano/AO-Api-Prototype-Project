const debug = require('debug')('app:jobController');
const job = require('./jobModel');
const sendError = require('../../utils/sendError');


const jobController = {
  FindResource: async (req, res) => {
    try {
      const foundJob = await job.find({ employee_id: req.params.id });
      res.status(200).json(foundJob);
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },

  UpdateResource: async (req, res) => {
    try {
      const updatedJob = await job.findByIdAndUpdate(req.params.jobId, req.body, { new: true });
      res.status(200).json(updatedJob);
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },
};

module.exports = jobController;
