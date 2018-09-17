const wallet = require('./walletModel');

const walletController = {
  FindWalletById: async (req, res, next) => {
    try {
      const foundWallet = await wallet.findOne({ employee_id: req.params.id });
      foundWallet.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(foundWallet);
    } catch (error) {
      next(error);
    }
  },

  UpdateWallet: async (req, res, next) => {
    try {
      req.body.lastChanged = new Date();
      if (req.body.paymentMethod) {
        const paymentMethod = `${req.body.paymentMethod.substring(0, 1).toUpperCase()}${req.body.paymentMethod.substring(1, req.body.paymentMethod.length).toLowerCase()}`;
        req.body.paymentMethod = paymentMethod;
      }
      const updatedWallet = await wallet.findOneAndUpdate({ employee_id: req.params.id }, { $set: req.body }, { new: true });
      updatedWallet.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(updatedWallet);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = walletController;
