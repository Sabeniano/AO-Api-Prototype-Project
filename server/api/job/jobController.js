const job = require('./jobModel');
const sendError = require('../../utils/sendError');


const jobController = {
  FindResource: async (req, res, next) => {
    try {
      const foundJob = await job.find({ employee_id: req.params.id });
      res.status(200).json(foundJob);
    } catch (error) {
      sendError(500, 'Error processing the request', error);
      next();
    }
  },

  UpdateResource: async (req, res, nex) => {
    try {
      const updatedJob = await job.findByIdAndUpdate(req.params.jobId, req.body, { new: true });
      res.status(200).json(updatedJob);
    } catch (error) {
      sendError(500, 'Error processing the request', error);
      next();
    }
  },
};

module.exports = jobController;
