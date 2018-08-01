const dotenv = require('dotenv');
const http = require('http');
// const fs = require('fs');
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

// const options = {
//   key: fs.readFileSync('./server.key'),
//   cert: fs.readFileSync('./server.crt'),
//   passphrase: 'server',
//   requestCert: false,
//   rejectUnauthorized: false,
// };


const server = http.createServer(app);
server.listen(config.app.port);
