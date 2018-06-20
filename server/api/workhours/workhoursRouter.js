const workhoursRouter = require('express').Router({ mergeParams: true });
const workhoursController = require('./workhoursController');
const MessageService = require('../../utils/messageService');

workhoursRouter.route('/')
  .get(workhoursController.FindResource)
  .post(MessageService(405, 'Cannot create new work'))
  .patch(MessageService(405, 'Use /workhours/workhoursId to update specific resource'))
  .delete(MessageService(405, 'Cannot delete work'));

workhoursRouter.route('/:workhoursId')
  .get(workhoursController.FindResource)
  .post(MessageService(405, 'Cannot create new work'))
  .patch(workhoursController.UpdateResource)
  .delete(MessageService(405, 'Cannot delete workhours'));

module.exports = workhoursRouter;
