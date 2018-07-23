const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const hlGenerator = require('../../utils/hyperMediaLinkGenerator');

const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId() },
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    // create indexes in the table, for faster look up
    unique: true,
    //  Regex pattern that validates email
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  role: { type: String, enum: ['Master Administrator', 'Administrative', 'Employee'], default: 'Employee' },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  password: { type: String, required: true },
  links: {
    type: [{
      _id: false,
      rel: String,
      type: { type: String, enum: ['GET', 'POST', 'PATCH', 'DELETE'] },
      href: String,
      description: String,
    }],
    default: [],
  },
});

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    next();
  } else {
    const hashedPassword = await this.encryptPassword(this.password);
    this.password = hashedPassword;
    next();
  }
});

userSchema.methods = {
  authenticate: async function authenticateUser(plainTextPassword) {
    const authenticated = await bcrypt.compare(plainTextPassword, this.password);
    return authenticated;
  },
  encryptPassword: async function encrypPass(plainTextPassword) {
    if (!plainTextPassword) {
      return '';
    }
    const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
    return hashedPassword;
  },

  removePassword: function removePasswordt() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
  },
};

userSchema.method('SetUpHyperLinks', function setupHL(hostName, url) {
  const hateaosEndpoints = [
    {
      rel: 'self',
      type: 'GET',
      description: 'view this user',
    },
    {
      rel: 'self',
      type: 'PATCH',
      description: 'update this user',
    },
    {
      rel: 'self',
      type: 'DELETE',
      description: 'delete this user',
    },
  ];
  hlGenerator(this, hostName, url, hateaosEndpoints);
});

module.exports = mongoose.model('User', userSchema);