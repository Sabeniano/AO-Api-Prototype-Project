import express from 'express';
import scheduleController from './scheduleController';
import MessageService from '../../utils/messageService';

const scheduleRouter = express.Router();

scheduleRouter.route('/')
  .get(scheduleController.FindResource)
  .post(MessageService(405, 'Cannot create a new schedule'))
  .put(MessageService(405, 'Use /schedule/scheduleId to update specific resource'))
  .delete(MessageService(405, 'Cannot delete a schedule'));

scheduleRouter.route('/:scheduleId')
  .get(scheduleController.FindResourceById)
  .post(MessageService(405, 'Use /schedule/ only to create a new resource'))
  .put(scheduleController.UpdateResource)
  .delete(MessageService(405, 'Cannot delete workhours'));

export default scheduleRouter;
