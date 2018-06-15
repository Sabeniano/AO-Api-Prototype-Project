import express from 'express';
import employeeController from './employeeController';
import MessageService from '../../utils/messageService';

const employeeRouter = express.Router();

// Using the specifik methods it sends the data from employeeController to api.js
// Only the methods with attached parameters will work

employeeRouter.route('/')
  .get(employeeController.FindResource)
  .post(employeeController.CreateResource)
  .put(MessageService(405, 'Use /employee/ID to update specific resource'))
  .delete(MessageService(405, 'Use /employee/ID to delete specific resource'));

employeeRouter.route('/:id')
  .get(employeeController.FindResourceById)
  .post(MessageService(405, 'Use /employee/ only to create a new resource'))
  .put(employeeController.UpdateResource)
  .delete(employeeController.DeleteResource);

export default employeeRouter;
