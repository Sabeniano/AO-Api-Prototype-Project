const employeeRouter = require('express').Router()
const employeeController = require('./employeeController');
const MessageService = require('../../utils/messageService');

// Using the specifik methods it sends the data from employeeController to api.js
// Only the methods with attached parameters will work

employeeRouter.route('/')
  .get(employeeController.FindResource)
  .post(employeeController.CreateResource)
  .patch(MessageService(405, 'Use /employee/ID to update specific resource'))
  .delete(MessageService(405, 'Use /employee/ID to delete specific resource'));

employeeRouter.route('/:id')
  .get(employeeController.FindResourceById)
  .post(MessageService(405, 'Use /employee/ only to create a new resource'))
  .patch(employeeController.UpdateResource)
  .delete(employeeController.DeleteResource);

module.exports = employeeRouter;
