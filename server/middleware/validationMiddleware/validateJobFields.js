const { body } = require('express-validator/check');

exports.updateFields = [
  body('_id')
    .isEmpty().withMessage('must not be specified'),

  body('jobTitle')
    .isString().withMessage('jobTitle must be a string')
    .optional(),

  body('employee_id')
    .isEmpty().withMessage('must not be specified'),

  body('description')
    .isString().withMessage('description must be a string')
    .optional(),
];
