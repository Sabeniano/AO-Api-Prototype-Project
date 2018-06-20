const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

module.exports = mongoose.model('users', userSchema);
