import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  permissions: [],
  //  TODO: figure out how to figure out which company
});

userSchema.methods.verifyPassword = async (password) => {
  bcrypt.compare(password, this.password, (error, match) => {
    if (error) {
      throw error;
    } else {
      return match;
    }
  });
};

export default mongoose.model('users', userSchema);
