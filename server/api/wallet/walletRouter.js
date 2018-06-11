import express from 'express';
//import walletController from './server/api/wallet/walletController';

const walletRouter = express.Router();

walletRouter.route('/')
  .get(walletController.FindResource)
  .post(walletController.CreateResource)
  .put(MessageService(405, 'Use /wallet/idWallet to update specific resource'))
  .delete(MessageService(405, 'Use /wallet/idWallet to delete specific resource'));

walletRouter.route('/:idWallet')
  .get(walletController.FindResourceById)
  .post(MessageService(405, 'Use /wallet/ only to create a new resource'))
  .put(walletController.UpdateResource)
  .delete(walletController.DeleteResource);

  export default walletRouter;