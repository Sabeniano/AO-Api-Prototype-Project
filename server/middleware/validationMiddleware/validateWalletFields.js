const { body } = require('express-validator/check');

exports.updateFields = [
  body('_id', 'must not be specified').isEmpty(),
  body('wage', 'must specify a city').isNumeric(),
  body('salary', 'must specify a city').isNumeric(),
  body('paymentMethod', 'must specify a country').isString(),
  body('employee_id', 'must not be specified').isEmpty(),
  body('lastChanged', 'must specify a valid date').isEmpty(),
];
