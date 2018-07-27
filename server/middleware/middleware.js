const morgan = require('morgan');
const bodyParser = require('body-parser');
const corsMiddleware = require('./headersMiddleware/CORSmiddleware');
const verifyContentType = require('./headersMiddleware/verifyContentType');

module.exports = (app) => {
  app.disable('x-powered-by');
  app.use(corsMiddleware());
  app.use(verifyContentType());
  app.use(morgan('combined'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
};
