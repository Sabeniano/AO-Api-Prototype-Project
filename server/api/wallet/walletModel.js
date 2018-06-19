import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  wage: Number,
  salary: Number,
  paymentMethod: { type: String, enum: ['Monthly', 'Hourly'] },
  employees_id: String,
  lastChanged: { type: Date, default: Date.now },
  links: [{
    _id: false,
    rel: String,
    href: String,
  }],
});

export default mongoose.model('Wallets', walletSchema);
