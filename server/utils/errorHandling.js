const logger = require('./loggerWrapper');

function handleError() {
  return (error, req, res, next) => {
    logger.log(error, 'error')
    if (!error.status) {
      error.status = 500;
    }
    if (!error.resMessage) {
      error.resMessage = 'Error proccessing the request';
    }
    res.status(error.status).json({
      status: error.status,
      message: error.message,
    });
  };
}

module.exports = handleError;
