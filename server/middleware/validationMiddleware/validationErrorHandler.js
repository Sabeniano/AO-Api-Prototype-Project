const { validationResult } = require('express-validator/check');

function validationErrorHandler() {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: 422,
        messaeg: 'Some fields were not populated properly',
        errors: errors.array({ onlyFirstError: true }),
      });
    }
    return next();
  };
}

module.exports = validationErrorHandler;
