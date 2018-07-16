const workhoursRouter = require('express').Router({ mergeParams: true });
const workhoursController = require('./workhoursController');
const MessageService = require('../../utils/messageService');

workhoursRouter.route('/')
  .get(workhoursController.FindWorkhourById)
  .post(MessageService(405, 'Cannot create new work'))
  .patch(workhoursController.UpdateWorkhour)
  .delete(MessageService(405, 'Cannot delete work'));

module.exports = workhoursRouter;
