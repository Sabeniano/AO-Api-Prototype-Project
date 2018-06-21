const workhours = require('./workhoursModel');
const sendError = require('../../utils/sendError');

const workhoursController = {
  FindResource: async (req, res, next) => {
    try {
      const foundWorkhours = await workhours.find({ employees_id: req.params.id });
      res.status(200).json(foundWorkhours);
    } catch (error) {
      sendError(500, 'Error processing the request', error);
      next();
    }
  },

  UpdateResource: async (req, res, next) => {
    try {
      const updatedWorkhours = await workhours.findByIdAndUpdate(req.params.workhoursId, req.body);
      res.status(200).json(updatedWorkhours);
    } catch (error) {
      sendError(500, 'Error processing the request', error);
      next();
    }
  },
};

module.exports = workhoursController;
