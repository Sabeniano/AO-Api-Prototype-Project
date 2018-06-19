import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  birthday: Date,
  address: String,
  phoneNumber: Number,
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jobs',
  },
  startDate: { type: Date, default: Date.now },
  lastChanged: { type: Date, default: Date.now },
  links: [{
    _id: false,
    rel: String,
    href: String,
  }],
});

export default mongoose.model('Employees', employeeSchema);
