const dotenv = require('dotenv').config();
const logger = require('./server/utils/logger');
const config = require('./server/config/config');
const app = require('./server/server');
const dbConnect = require('./server/db');
const seedDB = require('./server/utils/seedDB');

logger.log(`You are running in ${process.env.NODE_ENV.toUpperCase()} enviroment`);

dbConnect();

seedDB();

app.listen(config.app.port);

logger.log(config.app.port);
