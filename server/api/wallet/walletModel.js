const mongoose = require('mongoose');
const moment = require('moment-timezone');
const hlGenerator = require('../../utils/hyperMediaLinkGenerator'); 

const currentTime = new Date(moment().add(2, 'hours').format());

const walletSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
  wage: { type: Number, default: 0 },
  salary: { type: Number, default: 0 },
  paymentMethod: { type: String, enum: ['Monthly', 'Hourly'], default: 'Hourly' },
  employee_id: { type: String, required: true },
  lastChanged: { type: Date, default: currentTime },
  links: {
    type: [{
      _id: false,
      rel: String,
      href: String,
      description: String,
    }],
    default: [],
  },
});

walletSchema.method('SetUpHyperLinks', function setupHL(hostName, url) {
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
    hlGenerator(this, hostName, url, hateaosEndpoints, true);
  }
});

module.exports = mongoose.model('Wallet', walletSchema);
