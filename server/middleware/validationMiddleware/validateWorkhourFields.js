const { body } = require('express-validator/check');

exports.updatefields = [
  body('_id')
  .isEmpty().withMessage('_id must be empty'),

  body('employee_id')
  .isEmpty().withMessage('employee_id must be empty'),

  body('totalHoursThisPaycheck')
  .isNumeric().withMessage('totalHourTHisPaycheck must be a number')
  .optional(),

  body('totalOvertimeHoursThisPaycheck')
  .isNumeric().withMessage('totalOvertimeHoursThisPaycheck must be a number')
  .optional(),
];
