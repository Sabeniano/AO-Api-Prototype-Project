import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  permissions: [],
  //  TODO: figure out how to figure out which company
});

export default mongoose.model('users', userSchema);
