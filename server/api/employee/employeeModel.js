const mongoose = require('mongoose');
const moment = require('moment-timezone');
const hlGenerator = require('../../utils/hyperMediaLinkGenerator');

const currentTime = new Date(moment().add(2, 'hours').format());
const nDate = new Date(moment().format()).toLocaleString('en-DK', {
  timeZone: 'Europe/Copenhagen'
});

console.log(currentTime);
console.log(nDate);
// console.log(moment().add(2, 'hours').format('DD/MM/YYYY h:mm:ss'));

const employeeSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    // create indexes in the table, for faster look up
    unique: true,
    //  Regex pattern that validates email
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  birthday: { type: Date, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  street: { type: String, required: true },
  phoneNumber: { type: Number, require: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
<<<<<<< HEAD
  startDate: { type: Date, default: moment().format('DD/MM/YYYY') },
  lastChanged: { type: Date, default: nDate },
=======
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jobs',
  },
  startDate: { type: Date, default: moment().format('DD/MM/YYYY') },
  lastChanged: { type: Date, default: currentTime },
>>>>>>> 4f9403191dfda947386ea443e5883db50e1bacb1
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

employeeSchema.method('SetUpHyperLinks', function setupHL(hostName, url) {
  {
    const hateaosEndpoints = [
      {
        rel: 'self',
        type: 'GET',
        description: 'view this employee',
      },
      {
        rel: 'self',
        type: 'PATCH',
        description: 'update this employee',
      },
      {
        rel: 'self',
        type: 'DELETE',
        description: 'delete this employee',
      },
      {
        rel: 'job',
        type: 'GET',
        description: 'get employees job',
      },
      {
        rel: 'wallet',
        type: 'GET',
        description: 'get employees wallet',
      },
      {
        rel: 'schedules',
        type: 'GET',
        description: 'get employees schedules',
      },
      {
        rel: 'workhours',
        type: 'GET',
        description: 'get employees workhour',
      },
    ];
    hlGenerator(this, hostName, url, hateaosEndpoints);
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
