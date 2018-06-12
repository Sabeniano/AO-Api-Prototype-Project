import express from 'express';
//import employeeController from './server/api/employee/employeeController';

const employeeRouter = express.Router();

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
