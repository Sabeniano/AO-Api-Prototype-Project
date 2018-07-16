const schedule = require('./scheduleModel');

const scheduleController = {
  FindResource: async (req, res, next) => {
    try {
      const foundSchedule = await schedule.find({ employee_id: req.params.id });
      res.status(200).json(foundSchedule);
    } catch (error) {
      next(error);
    }
  },

  UpdateResource: async (req, res, next) => {
    try {
      const updatedSchedule = await schedule.findByIdAndUpdate(req.params.scheduleId, req.body, { new: true });
      res.status(200).json(updatedSchedule);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = scheduleController;
