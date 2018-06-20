const mongoose = require('mongoose');
const debug = require('debug')('app:db');
const config = require('./config/config');

const connectionString = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

module.exports = function dbConnect() {
  try {
    mongoose.connect(connectionString);
    debug(`Connected to db with ${connectionString}`);
  } catch (error) {
    debug(error);
  }
}
