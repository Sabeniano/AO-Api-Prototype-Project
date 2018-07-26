const mongoose = require('mongoose');
const logger = require('./utils/loggerWrapper');
const config = require('./config/config');

const connectionString = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;
 
module.exports = function dbConnect() {
  try {
    mongoose.connect(connectionString);
    logger.log(`Connected to db with ${connectionString}`, 'info', true);
  } catch (error) {
    logger.log(error);
  }
};
