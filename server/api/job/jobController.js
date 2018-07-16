const job = require('./jobModel');

const jobController = {
  FindJobById: async (req, res, next) => {
    try {
      const foundJob = await job.findOne({ employee_id: req.params.id });
      foundJob.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(foundJob);
    } catch (error) {
      next(error);
    }
  },

  UpdateJob: async (req, res, nex) => {
    try {
      const updatedJob = await job.findOneAndUpdate({ employee_id: req.params.id }, { $set: req.body }, { new: true });
      updatedJob.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(updatedJob);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = jobController;
