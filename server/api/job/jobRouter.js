import express from 'express';
import jobController from './jobController';
import MessageService from '../../utils/messageService';

const jobRouter = express.Router();

jobRouter.route('/')
  .get(jobController.FindResource)
  .post(jobController.CreateResource)
  .patch(MessageService(405, 'Use /job/jobId to update specific resource'))
  .delete(MessageService(405, 'Use /job/jobId to delete specific resource'));

jobRouter.route('/:jobId')
  .get(jobController.FindResource)
  .post(MessageService(405, 'Use /job/ only to create a new resource'))
  .patch(jobController.UpdateResource)
  .delete(jobController.DeleteResource);

export default jobRouter;
