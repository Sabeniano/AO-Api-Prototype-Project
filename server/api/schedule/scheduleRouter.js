import express from 'express';
import scheduleController from './scheduleController';
import MessageService from '../../utils/messageService';

const scheduleRouter = express.Router({ mergeParams: true });

scheduleRouter.route('/')
  .get(scheduleController.FindResource)
  .post(MessageService(405, 'Cannot create a new schedule'))
  .patch(MessageService(405, 'Use /schedule/scheduleId to update specific resource'))
  .delete(MessageService(405, 'Cannot delete a schedule'));

scheduleRouter.route('/:scheduleId')
  .get(scheduleController.FindResource)
  .post(MessageService(405, 'Cannot create a new schedule'))
  .patch(scheduleController.UpdateResource)
  .delete(MessageService(405, 'Cannot delete a schedule'));

export default scheduleRouter;
