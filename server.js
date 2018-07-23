const dotenv = require('dotenv');
const http = require('http');
const logger = require('./server/utils/loggerWrapper');
const config = require('./server/config/config');
const app = require('./server/app');
const dbConnect = require('./server/db');
const seedDB = require('./server/utils/seedDB');

dotenv.config();

logger.log(`You are running in ${process.env.NODE_ENV.toUpperCase()} enviroment`, 'info', true);

dbConnect();

if (process.env.NODE_ENV !== 'PROD') {
  seedDB();
}

const server = http.createServer(app);
server.listen(config.app.port);
