import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  //  TODO: figure out how to figure out which company
});

export default mongoose.model('employees', employeeSchema);
