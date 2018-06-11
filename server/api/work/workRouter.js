import express from 'express';
//import workController from './server/api/work/workController';

const workRouter = express.Router();

workRouter.route('/')
  .get(workController.FindResource)
  .post(workController.CreateResource)
  .put(MessageService(405, 'Use /work/ID to update specific resource'))
  .delete(MessageService(405, 'Use /work/ID to delete specific resource'));

  export default workRouter;