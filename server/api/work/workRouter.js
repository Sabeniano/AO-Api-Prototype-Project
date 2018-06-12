import express from 'express';
//import workController from './server/api/work/workController';

const workRouter = express.Router();

workRouter.route('/')
  .get(workController.FindResource)
  .post(MessageService(405, 'Cannot create new work'))
  .put(MessageService(405, 'Use /work/workId to update specific resource'))
  .delete(MessageService(405, 'Cannot delete work'));

workRouter.route('/:workId')
  .get(workController.FindResourceById)
  .post(MessageService(405, 'Use /work/ to update specific resource'))
  .put(workController.UpdateResource)
  .delete(MessageService(405, 'Cannot delete work'));

  export default workRouter;