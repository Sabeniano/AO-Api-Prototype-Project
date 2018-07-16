const wallet = require('./walletModel');

const walletController = {
  FindResource: async (req, res, next) => {
    try {
      const foundWallet = await wallet.find({ employees_id: req.params.id });
      res.status(200).json(foundWallet);
    } catch (error) {
      next(error);
    }
  },

  UpdateResource: async (req, res, next) => {
    try {
      const updatedWallet = await wallet.findByIdAndUpdate(req.params.walletId, req.body, { new: true });
      res.status(200).json(updatedWallet);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = walletController;
