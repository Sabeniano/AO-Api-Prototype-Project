const scheduleRouter = require('express').Router({ mergeParams: true });
const scheduleController = require('./scheduleController');
const MessageService = require('../../utils/messageService');
const verifyRole = require('../../middleware/authMiddleware/verifyRole');
const validationErrorHandler = require('../../middleware/validationMiddleware/validationErrorHandler');
const validateScheduleFields = require('../../middleware/validationMiddleware/validateScheduleFields');

scheduleRouter.param('scheduleId', scheduleController.params);

scheduleRouter.route('/')
  .get(scheduleController.GetAllSchedules)
  .post(verifyRole(), validateScheduleFields.createfields, validationErrorHandler(), scheduleController.CreateSchedule)
  .patch(MessageService(405, 'Use /schedules/id to update a specfic schedule'))
  .delete(MessageService(405, 'Use /schedules/id to delete a specfic schedule'));

scheduleRouter.route('/:scheduleId')
  .get(scheduleController.GetScheduleById)
  .post(MessageService(405, 'Use /schedules/ to create a schedule'))
  .patch(verifyRole(), validateScheduleFields.updatefields, validationErrorHandler(), scheduleController.UpdateScheduleById)
  .delete(verifyRole(), scheduleController.DeleteScheduleById);

module.exports = scheduleRouter;
