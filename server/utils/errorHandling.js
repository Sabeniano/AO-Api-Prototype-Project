const logger = require('./logger');

function handleError() {
  return (error, req, res, next) => {
    logger.log(error)
    res.status(error.status || 500);
    res.json({
      status: error.status,
      message: error.message,
    });
  };
}

module.exports = handleError;
