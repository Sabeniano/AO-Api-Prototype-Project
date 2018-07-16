const scheduleRouter = require('express').Router({ mergeParams: true });
const scheduleController = require('./scheduleController');
const MessageService = require('../../utils/messageService');

scheduleRouter.route('/')
  .get(scheduleController.FindResource)
  .post(MessageService(405, 'Cannot create a new schedule'))
  .patch(MessageService(405, 'Use /schedule/scheduleId to update specific resource'))
  .delete(MessageService(405, 'Cannot delete a schedule'));

scheduleRouter.route('/:scheduleId')
  .get(scheduleController.FindResource)
  .post(MessageService(405, 'Cannot create a new schedule'))
  .patch(scheduleController.UpdateResource)
  .delete(MessageService(405, 'Cannot delete a schedule'));

module.exports = scheduleRouter;
