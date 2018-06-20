const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  jobTitle: String,
  employee_id: String,
  description: String,
  permissions: [],
  links: [{
    _id: false,
    rel: String,
    href: String,
  }],
});

module.exports = mongoose.model('Jobs', jobSchema);
