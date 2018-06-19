import employeeControllerDebug from 'debug';
import wallet from './walletModel';
import sendError from '../../utils/sendError';

const debug = employeeControllerDebug('app:walletController');

const walletController = {
  FindResource: async (req, res) => {
    try {
      const foundWallet = await wallet.find({ employees_id: req.params.id });
      res.status(200).json(foundWallet);
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },

  UpdateResource: async (req, res) => {
    try {
      const updatedWallet = await wallet.findByIdAndUpdate(req.params.walletId, req.body, { new: true });
      res.status(200).json(updatedWallet);
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },
};

export default walletController;
