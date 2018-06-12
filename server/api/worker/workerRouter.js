import express from 'express';
//import workerController from './server/api/worker/workerController';

const workerRouter = express.Router();

workerRouter.route('/')
  .get(workerController.FindResource)
  .post(workerController.CreateResource)
  .put(MessageService(405, 'Use /worker/ID to update specific resource'))
  .delete(MessageService(405, 'Use /worker/ID to delete specific resource'));

  workerRouter.route('/:id')
  .get(workerController.FindResourceById)
  .post(MessageService(405, 'Use /worker/ only to create a new resource'))
  .put(workerController.UpdateResource)
  .delete(workerController.DeleteResource);

  export default workerRouter;
