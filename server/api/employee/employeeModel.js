import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  birthday: Date,
  address: String,
  phoneNumber: Number,
  jobs_id: String,
  startDate: { type: Date, default: Date.now },
  lastChanged: { type: Date, default: Date.now },
  links: [{}],
});

export default mongoose.model('Employees', employeeSchema);
