const morgan = require('morgan');
const bodyParser = require('body-parser');
const corsMiddleware = require( './CORSmiddleware');


module.exports = function (app) {
  app.use(corsMiddleware());
  app.use(morgan('combined'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
}

