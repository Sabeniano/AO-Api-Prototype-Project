const dotenv = require('dotenv').config();
const debug = require('debug')('app');
const config = require('./server/config/config');
const app = require('./server/server');
const dbConnect = require('./server/db');
const seedDB = require('./server/utils/seedDB');

debug(`You are running in ${process.env.NODE_ENV.toUpperCase()} enviroment`);

dbConnect();

seedDB();

app.listen(config.app.port);

debug(config.app.port);
