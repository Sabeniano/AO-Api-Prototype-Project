const scheduleRouter = require('express').Router({ mergeParams: true });
const scheduleController = require('./scheduleController');
const MessageService = require('../../utils/messageService');

scheduleRouter.route('/')
  .get(scheduleController.GetAllSchedules)
  .post(scheduleController.CreateSchedule)
  .patch(MessageService(405, 'Use /schedules/id to update a specfic schedule'))
  .delete(MessageService(405, 'Use /schedules/id to delete a specfic schedule'));

scheduleRouter.route('/:scheduleId')
  .get(scheduleController.GetScheduleById)
  .post(MessageService(405, 'Use /schedules/ to create a schedule'))
  .patch(scheduleController.UpdateScheduleById)
  .delete(scheduleController.DeleteScheduleById);

module.exports = scheduleRouter;
