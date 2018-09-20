const { body } = require('express-validator/check');

exports.createfields = [
  //  TODO: fix these date checks properly with a custom validator in next update
  body('workDate')
    .exists().withMessage('workDate must not be empty')
    .isISO8601().withMessage('workDate must be a valid ISO date format'),

  body('startHour')
    .exists().withMessage('startHour must not be empty')
    .isISO8601().withMessage('startHour must be a valid ISO date format'),

  body('endHour')
    .exists().withMessage('endHour must not be empty')
    .isISO8601().withMessage('endHour must be a valid ISO date format'),

  body('isHoliday')
    .isBoolean().withMessage('isHoliday must be a boolean')
    .optional(),

  body('isWeekend')
    .isBoolean().withMessage('isWeekend must be a boolean')
    .optional(),
];

exports.updatefields = [
  //  TODO: fix these date checks properly with a custom validator in next update
  body('workDate')
    .isISO8601().withMessage('workDate must be a valid ISO date format')
    .optional(),

  body('startHour')
    .isISO8601().withMessage('startHour must be a valid ISO date format')
    .optional(),

  body('endHour')
    .isISO8601().withMessage('endHour must be a valid ISO date format')
    .optional(),

  body('isHoliday')
    .isBoolean().withMessage('isHoliday must be a boolean')
    .optional(),

  body('isWeekend')
    .isBoolean().withMessage('isWeekend must be a boolean')
    .optional(),
];
