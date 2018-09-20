const scheduleRouter = require('express').Router({ mergeParams: true });
const c = require('../../utils/controllerHandler');
const p = require('../../utils/paramHandler');
const MessageService = require('../../utils/messageService');
const verifyRole = require('../../middleware/authMiddleware/verifyRole');
const validateFields = require('../../middleware/validationMiddleware/scheduleControllerValidation');
const validationErrorHandler = require('../../middleware/validationMiddleware/validationErrorHandler');
const {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateScheduleById,
  deleteScheduleById,
} = require('./scheduleController');

scheduleRouter.param('scheduleId', p(req => [req.params.id, req.params.scheduleId]));

scheduleRouter.route('/')
  .get(c(getAllSchedules, req => [req.params.id, req.headers.host, req.originalUrl]))
  .post(
    verifyRole(),
    validateFields.createfields,
    validationErrorHandler(),
    c(createSchedule, req => [req.body, req.headers.host, req.originalUrl]),
  )
  .patch(MessageService(405, 'Use /schedules/id to update a specfic schedule'))
  .delete(MessageService(405, 'Use /schedules/id to delete a specfic schedule'));

scheduleRouter.route('/:scheduleId')
  .get(c(getScheduleById, req => [req.params.scheduleId, req.headers.host, req.originalUrl]))
  .post(MessageService(405, 'Use /schedules/ to create a schedule'))
  .patch(
    verifyRole(), 
    validateFields.updatefields, 
    validationErrorHandler(), 
    c(updateScheduleById, req => [req.body, req.params.scheduleId, req.headers.host, req.originalUrl]),
  )
  .delete(verifyRole(), c(deleteScheduleById, req => [req.params.scheduleId]));

module.exports = scheduleRouter;
