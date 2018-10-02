const jobRouter = require('express').Router({ mergeParams: true });
const jobController = require('./jobController');
const MessageService = require('../../utils/messageService');
const verifyRole = require('../../middleware/authMiddleware/verifyRole');
const validationErrorHandler = require('../../middleware/validationMiddleware/validationErrorHandler');
const validateJobFields = require('../../middleware/validationMiddleware/validateJobFields');
const redisMiddleware = require('../../middleware/cacheMiddleware/cache');

jobRouter.route('/')
  .get(redisMiddleware(1), jobController.FindJobById)
  .post(MessageService(405, 'Cannot create a new job resource'))
  .patch(verifyRole(), validateJobFields.updateFields, validationErrorHandler(), jobController.UpdateJob)
  .delete(MessageService(405, 'Cannot delete a job resource'));

module.exports = jobRouter;
