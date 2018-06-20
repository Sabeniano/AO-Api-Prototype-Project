const mongoose = require('mongoose');

const workhoursSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  employees_id: String,
  totalHoursThisPaycheck: Number,
  totalOvertimeHoursThisPaycheck: Number,
  links: [{
    _id: false,
    rel: String,
    href: String,
  }],
});

module.exports = mongoose.model('Workhours', workhoursSchema);
