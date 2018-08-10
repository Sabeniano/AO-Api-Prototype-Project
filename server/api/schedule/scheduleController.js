const Schedule = require('./scheduleModel');
const mongoose = require('mongoose');

const scheduleController = {
  params: (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      const error = new Error();
      error.status = 404;
      error.resMessage = 'Invalid ID';
      next(error)
    } else {
      next();
    }
  },
  
  GetAllSchedules: async (req, res, next) => {
    try {
      const foundSchedules = await Schedule.find({ employee_id: req.params.id }, 'work_date start_work_hour end_work_hour links');
      const documents = {
        count: foundSchedules.length,
        schedules: foundSchedules,
      };
      if (documents.count > 0) {
        for (let i = 0; i < foundSchedules.length; i += 1) {
          foundSchedules[i].SetUpHyperLinks(req.headers.host, req.originalUrl);
        };
        res.status(200).json(documents);
      } else {
        res.status(200).json(documents);
      }
    } catch (error) {
      next(error);
    }
  },

  GetScheduleById: async (req, res, next) => {
    try {
      const foundSchedule = await Schedule.findOne({ _id: req.params.scheduleId });
      if (foundSchedule) {
        foundSchedule.SetUpHyperLinks(req.headers.host, req.originalUrl);
        res.status(200).json(foundSchedule);
      } else {
        res.status(204).json({});
      }
    } catch (error) {
      next(error);
    }
  },

  CreateSchedule: async (req, res, next) => {
    try {
      const newSchedule = {
        _id: new mongoose.Types.ObjectId(),
        employee_id: req.params.id,
        work_date: req.body.work_date,
        start_work_hour: req.body.start_work_hour,
        end_work_hour: req.body.end_work_hour,
        is_holiday: req.body.is_holiday,
        is_weekend: req.body.is_weekend,
      };
      const createdSchedule = await Schedule.create(newSchedule);
      createdSchedule.SetUpHyperLinks(req.headers.host, req.originalUrl, { removeUrlSlashes: 1 });
      res.status(201).json(createdSchedule);
    } catch (error) {
      next(error);
    }
  },

  UpdateScheduleById: async (req, res, next) => {
    try {
      const updatedSchedule = await Schedule
        .findOneAndUpdate({ _id: req.params.scheduleId }, { $set: req.body }, { new: true });
      updatedSchedule.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(updatedSchedule);
    } catch (error) {
      next(error);
    }
  },

  DeleteScheduleById: async (req, res, next) => {
    try {
      await Schedule.findOneAndRemove({ _id: req.params.scheduleId });
      res.status(200).json({ status: 200, message: 'Successfully deleted schedule' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = scheduleController;
