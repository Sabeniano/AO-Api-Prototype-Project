import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  birthday: Date,
  address: String,
  phoneNumber: Number,
  startDate: { type: Date, default: Date.now },
  lastChanged: { type: Date, default: Date.now },
  links: [{}],
});

export default mongoose.model('employees', employeeSchema);
