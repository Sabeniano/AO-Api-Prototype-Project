const { body } = require('express-validator/check');


exports.updateFields = [
  body('_id', 'must not be specified').isEmpty(),
  body('jobTitle', 'must specify a city').isString(),
  body('employee_id', 'must not be specified').isEmpty(),
  body('description', 'must specify a country').isString(),
];
