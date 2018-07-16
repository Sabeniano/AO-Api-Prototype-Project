const wallet = require('./walletModel');
const sendError = require('../../utils/sendError');

const walletController = {
  FindResource: async (req, res, next) => {
    try {
      const foundWallet = await wallet.find({ employees_id: req.params.id });
      res.status(200).json(foundWallet);
    } catch (error) {
      sendError(500, 'Error processing the request', error);
      next();
    }
  },

  UpdateResource: async (req, res, next) => {
    try {
      const updatedWallet = await wallet.findByIdAndUpdate(req.params.walletId, req.body, { new: true });
      res.status(200).json(updatedWallet);
    } catch (error) {
      sendError(500, 'Error processing the request', error);
      next();
    }
  },
};

module.exports = walletController;
