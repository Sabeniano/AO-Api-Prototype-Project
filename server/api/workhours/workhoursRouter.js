const workhoursRouter = require('express').Router({ mergeParams: true });
const workhoursController = require('./workhoursController');
const MessageService = require('../../utils/messageService');
const verifyRole = require('../../middleware/authMIddleware/verifyRole');

workhoursRouter.route('/')
  .get(workhoursController.FindWorkhourById)
  .post(MessageService(405, 'Cannot create new work'))
  .patch(verifyRole, workhoursController.UpdateWorkhour)
  .delete(MessageService(405, 'Cannot delete work'));

module.exports = workhoursRouter;
