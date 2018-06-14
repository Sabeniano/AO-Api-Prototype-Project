import employeeControllerDebug from 'debug';
import wallet from './walletModel';
import hlGenerator from '../../utils/hyperMediaLinkGenerator';

const debug = employeeControllerDebug('app:employeeController');

const walletController = {
  FindResource: async (req, res) => {
    try {
      const foundWallet = await wallet.find({ _owner: req.params.id });
      hlGenerator(foundWallet, req.headers.host, req.originalUrl, 'self');
      res.json(foundWallet);
    } catch (error) {
      debug(error);
      res.send('Error, could not find resource').status(204);
    }
  },

  FindResourceById: async (req, res) => {
    try {
      const foundWallet = await wallet.findById(req.params.walletId);
      res.json(foundWallet);
    } catch (error) {
      debug(error);
      res.send('The resource you are looking for does not exist').status(204);
    }
  },

  UpdateResource: async (req, res) => {
    try {
      await wallet.findByIdAndUpdate(req.params.walletId, req.body);
      res.send('New data updated').status(201);
    } catch (error) {
      res.send('Error processing the request').send(409);
    }
  },
};

export default walletController;
