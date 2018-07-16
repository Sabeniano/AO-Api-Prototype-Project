const employeeRouter = require('express').Router()
const employeeController = require('./employeeController');
const MessageService = require('../../utils/messageService');
const verifyRole = require('../../middleware/authMIddleware/verifyRole');

// Using the specifik methods it sends the data from employeeController to api.js
// Only the methods with attached parameters will work

employeeRouter.route('/')
  .get(employeeController.GetAllEmployees)
  .post(verifyRole, employeeController.CreateEmployee)
  .patch(MessageService(405, 'Use /employee/ID to update specific resource'))
  .delete(MessageService(405, 'Use /employee/ID to delete specific resource'));

employeeRouter.route('/:id')
  .get(employeeController.GetEmployeeById)
  .post(MessageService(405, 'Use /employee/ only to create a new resource'))
  .patch(verifyRole, employeeController.GetEmployeeById)
  .delete(verifyRole, employeeController.DeleteEmployee);

module.exports = employeeRouter;
