const mongoose = require('mongoose');
const hlGenerator = require('../../utils/hyperMediaLinkGenerator');

const workhoursSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
  employee_id: { type: String, required: true },
  totalHoursThisPaycheck: { type: Number, default: 0 },
  totalOvertimeHoursThisPaycheck: { type: Number, default: 0 },
  links: {
    type: [{
      _id: false,
      rel: String,
      href: String,
    }],
    default: [],
  },
});

workhoursSchema.method('SetUpHyperLinks', function setupHL(hostName, url) {
  {
    const hateaosEndpoints = [
      {
        rel: 'owner',
        type: 'GET',
        description: 'get this workhours owner',
      },
      {
        rel: 'self',
        type: 'PATCH',
        description: 'update this workhour',
      },
    ];
    hlGenerator(this, hostName, url, hateaosEndpoints, { isChild: true });
  }
});

module.exports = mongoose.model('Workhour', workhoursSchema);
