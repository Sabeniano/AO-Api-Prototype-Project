const employeeRouter = require('express').Router();
const MessageService = require('../../utils/messageService');
const c = require('../../utils/controllerHandler');
const p = require('../../utils/paramHandler');
const verifyRole = require('../../middleware/authMiddleware/verifyRole');
const validateFields = require('../../middleware/validationMiddleware/employeeControllerValidation');
const validationErrorHandler = require('../../middleware/validationMiddleware/validationErrorHandler');
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById,
} = require('./employeeController');

employeeRouter.param('id', p(req => [req.params.id]));

employeeRouter.route('/')
  .get(c(getAllEmployees, req => [req.query, req.headers.host, req.originalUrl]))
  .post(
    verifyRole(),
    validateFields.createFields,
    validationErrorHandler(),
    c(createEmployee, req => [req.body, req.body.user, req.headers.host, req.originalUrl]),
  )
  .patch(MessageService(405, 'Use /employees/id to update specific resource'))
  .delete(MessageService(405, 'Use /employees/id to delete specific resource'));

employeeRouter.route('/:id')
    .get(c(getEmployeeById, req => [req.params.id, req.headers.host, req.originalUrl]))
    .post(MessageService(405, 'Use /employees/ to create a new resource'))
    .patch(
      verifyRole(),
      validateFields.updateFields,
      validationErrorHandler(),
      c(updateEmployeeById, req => [req.body, req.params.id, req.headers.host, req.originalUrl]),
    )
    .delete(verifyRole(), c(deleteEmployeeById, req => [req.params.id]));

  module.exports = employeeRouter;