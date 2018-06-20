const walletRouter = require('express').Router({ mergeParams: true });
const walletController = require('./walletController');
const MessageService = require('../../utils/messageService');

walletRouter.route('/')
  .get(walletController.FindResource)
  .post(MessageService(405, 'Cannot create a new wallet'))
  .patch(MessageService(405, 'Use /wallet/walletId to update specific resource'))
  .delete(MessageService(405, 'Cannot delete a wallet'));

walletRouter.route('/:walletId')
  .get(walletController.FindResource)
  .post(MessageService(405, 'Cannot create a new wallet'))
  .patch(walletController.UpdateResource)
  .delete(MessageService(405, 'Cannot delete a wallet'));

module.exports = walletRouter;
