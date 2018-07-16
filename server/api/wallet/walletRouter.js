const walletRouter = require('express').Router({ mergeParams: true });
const walletController = require('./walletController');
const MessageService = require('../../utils/messageService');

walletRouter.route('/')
  .get(walletController.FindWalletById)
  .post(MessageService(405, 'Cannot create a new wallet'))
  .patch(walletController.UpdateWallet)
  .delete(MessageService(405, 'Cannot delete a wallet'));

module.exports = walletRouter;
