const job = require('./jobModel');

const jobController = {
  FindResource: async (req, res, next) => {
    try {
      const foundJob = await job.find({ employee_id: req.params.id });
      res.status(200).json(foundJob);
    } catch (error) {
      next(error);
    }
  },

  UpdateResource: async (req, res, nex) => {
    try {
      const updatedJob = await job.findByIdAndUpdate(req.params.jobId, req.body, { new: true });
      res.status(200).json(updatedJob);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = jobController;
