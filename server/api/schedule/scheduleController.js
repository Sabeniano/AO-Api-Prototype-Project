const debug = require('debug')('app:scheduleController');
const schedule = require('./scheduleModel');
const sendError = require('../../utils/sendError');

const scheduleController = {
  FindResource: async (req, res) => {
    try {
      const foundSchedule = await schedule.find({ employee_id: req.params.id });
      res.status(200).json(foundSchedule);
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },

  UpdateResource: async (req, res) => {
    try {
      const updatedSchedule = await schedule.findByIdAndUpdate(req.params.scheduleId, req.body, { new: true });
      res.status(200).json(updatedSchedule);
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },
};

module.exports = scheduleController;
