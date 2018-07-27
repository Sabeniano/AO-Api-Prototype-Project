const mongoose = require('mongoose');
const hlGenerator = require('../../utils/hyperMediaLinkGenerator');

const jobSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
  jobTitle: { type: String, default: 'Empty' },
  employee_id: { type: String, require: true },
  description: { type: String, default: 'Empty' },
  links: {
    type: [{
      _id: false,
      rel: String,
      href: String,
      description: String,
    }],
    default: [],
  },
});

jobSchema.method('SetUpHyperLinks', function setupHL(hostName, url) {
  {
    const hateaosEndpoints = [
      {
        rel: 'owner',
        type: 'GET',
        description: 'get this jobs owner',
      },
      {
        rel: 'self',
        type: 'PATCH',
        description: 'update this job',
      },
    ];
    hlGenerator(this, hostName, url, hateaosEndpoints, true);
  }
});

module.exports = mongoose.model('Job', jobSchema);
