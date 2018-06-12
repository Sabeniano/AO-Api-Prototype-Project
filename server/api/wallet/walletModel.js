import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  wage: Number,
  salary: Number,
  paymentMethod: { type: String, enum: ['Monthly', 'Hourly'] },
  _owner: Number,
  lastChanged: Date,
  links: [{}],
});

export default mongoose.model('Wallet', walletSchema);
