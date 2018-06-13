import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  wage: Number,
  salary: Number,
  paymentMethod: { type: String, enum: ['Monthly', 'Hourly'] },
  _owner: String,
  lastChanged: { type: Date, default: Date.now },
  links: [{}],
});

export default mongoose.model('wallets', walletSchema);
