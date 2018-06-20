const jobRouter = require('express').Router({ mergeParams: true });
const jobController = require('./jobController');
const MessageService = require('../../utils/messageService');

jobRouter.route('/')
  .get(jobController.FindResource)
  .post(MessageService(405, 'Cannot create a new job resource'))
  .patch(MessageService(405, 'Use /job/jobId to update specific resource'))
  .delete(MessageService(405, 'Cannot delete a job resource'));

jobRouter.route('/:jobId')
  .get(jobController.FindResource)
  .post(MessageService(405, 'Cannot create a new job resource'))
  .patch(jobController.UpdateResource)
  .delete(MessageService(405, 'Cannot delete a job resource'));

module.exports = jobRouter;
