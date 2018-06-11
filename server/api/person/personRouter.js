import express from 'express';
//import personController from './server/api/person/personController';

const personRouter = express.Router();

personRouter.route('/')
  .get(personController.FindResource)
  .post(personController.CreateResource)
  .put(MessageService(405, 'Use /person/ID to update specific resource'))
  .delete(MessageService(405, 'Use /person/ID to delete specific resource'));

personRouter.route('/:id')
  .get(personController.FindResourceById)
  .post(MessageService(405, 'Use /person/ only to create a new resource'))
  .put(personController.UpdateResource)
  .delete(personController.DeleteResource);

  export default personRouter;