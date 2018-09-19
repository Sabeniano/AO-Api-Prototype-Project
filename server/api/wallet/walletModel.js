const mongoose = require('mongoose');
const moment = require('moment');
const hlGenerator = require('../../utils/hyperMediaLinkGenerator');

//const currentTime = new Date(moment().add(2, 'hours').format());

const walletSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  wage: { type: Number, default: 0 },
  salary: { type: Number, default: 0 },
  paymentMethod: { type: String, enum: ['Monthly', 'Hourly'], default: 'Hourly' },
  _Owner: { type: String, required: true },
  lastChanged: { type: Date, default: () => new Date },
  links: {
    type: [{
      _id: false,
      rel: String,
      type: { type: String, enum: ['GET', 'POST', 'PATCH', 'DELETE'] },
      href: String,
      description: String,
    }],
    default: [],
  },
});

walletSchema.method('setupHyperLinks', function setupHL(hostName, url) {
  {
    const hateaosEndpoints = [
      {
        rel: 'owner',
        type: 'GET',
        description: 'get this wallets owner',
      },
      {
        rel: 'self',
        type: 'PATCH',
        description: 'update this wallet',
      },
    ];
    hlGenerator(this, hostName, url, hateaosEndpoints, { isChild: true });
  }
});

module.exports = mongoose.model('Wallet', walletSchema);
