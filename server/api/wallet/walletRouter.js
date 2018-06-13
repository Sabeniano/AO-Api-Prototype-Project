import express from 'express';
import walletController from './walletController';
import MessageService from '../../utils/messageService';

const walletRouter = express.Router();

walletRouter.route('/')
  .get(walletController.FindResource)
  .post(MessageService(405, 'Cannot create a new wallet'))
  .put(MessageService(405, 'Use /wallet/walletId to update specific resource'))
  .delete(MessageService(405, 'Cannot delete a wallet'));

walletRouter.route('/:walletId')
  .get(walletController.FindResourceById)
  .post(MessageService(405, 'Use /wallet/ only to create a new resource'))
  .put(walletController.UpdateResource)
  .delete(MessageService(405, 'Cannot delete a wallet'));

export default walletRouter;
