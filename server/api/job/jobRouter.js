const jobRouter = require('express').Router({ mergeParams: true });
const c = require('../../utils/controllerHandler');
const MessageService = require('../../utils/messageService');
const verifyRole = require('../../middleware/authMiddleware/verifyRole');
const validateFields = require('../../middleware/validationMiddleware/jobControllerValidation');
const validationErrorHandler = require('../../middleware/validationMiddleware/validationErrorHandler');
const { getJobByOwnerId, updateJobByOwnerId } = require('./jobController');

jobRouter.route('/')
  .get(c(getJobByOwnerId, req => [req.params.id, req.headers.host, req.originalUrl]))
  .post(MessageService(405, 'Cannot create a new job'))
  .patch(
    verifyRole(),
    validateFields.updateFields,
    validationErrorHandler(),
    c(updateJobByOwnerId, req => [req.body, req.params.id, req.headers.host, req.originalUrl]),
  )
  .delete(MessageService(405, 'Cannot delete a job'));

module.exports = jobRouter;
