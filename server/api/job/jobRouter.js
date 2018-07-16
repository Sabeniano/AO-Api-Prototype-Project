const jobRouter = require('express').Router({ mergeParams: true });
const jobController = require('./jobController');
const MessageService = require('../../utils/messageService');
const verifyRole = require('../../middleware/authMIddleware/verifyRole');

jobRouter.route('/')
  .get(jobController.FindJobById)
  .post(MessageService(405, 'Cannot create a new job resource'))
  .patch(verifyRole, jobController.UpdateJob)
  .delete(MessageService(405, 'Cannot delete a job resource'));

module.exports = jobRouter;
