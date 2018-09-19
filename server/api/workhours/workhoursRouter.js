const workhoursRouter = require('express').Router({ mergeParams: true });
const WorkhoursController = require('./workhoursController');
const MessageService = require('../../utils/messageService');
const verifyRole = require('../../middleware/authMiddleware/verifyRole');
const validateFields = require('../../middleware/validationMiddleware/workhoursControllerValidation');
const validationErrorHandler = require('../../middleware/validationMiddleware/validationErrorHandler');

workhoursRouter.route('/')
  .get(WorkhoursController.getWorkhoursById)
  .post(MessageService(405, 'Cannot create new work'))
  .patch(verifyRole(), validateFields.updateFields, validationErrorHandler(), WorkhoursController.updateWorkhoursById)
  .delete(MessageService(405, 'Cannot delete work'));

module.exports = workhoursRouter;
