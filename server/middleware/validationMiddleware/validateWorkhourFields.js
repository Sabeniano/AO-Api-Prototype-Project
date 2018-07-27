const { body } = require('express-validator/check');


exports.updatefields = [
  body('_id', 'must not be specified').isEmpty(),
  body('employee_id', 'must not be specified').isEmpty(),
  body('totalHoursThisPaycheck', 'must specify a valid number').isNumeric(),
  body('totalOvertimeHoursThisPaycheck', 'must specify a valid number').isNumeric(),
];
