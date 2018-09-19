const mongoose = require('mongoose');
const hlGenerator = require('../../utils/hyperMediaLinkGenerator');

const workhoursSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  _Owner: { type: String, required: true },
  totalHoursThisPaycheck: { type: Number, default: 0 },
  totalOvertimeHoursThisPaycheck: { type: Number, default: 0 },
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

workhoursSchema.method('setupHyperLinks', function setupHL(hostName, url) {
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
