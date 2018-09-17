const { body } = require('express-validator/check');

exports.createfields = [
  //  TODO: fix these date checks properly with a custom validator in next update
  body('work_date')
    .exists().withMessage('work_date must not be empty')
    .isISO8601(),

  body('start_work_hour')
    .exists().withMessage('start_work_hour must not be empty')
    .isISO8601(),

  body('end_work_hour')
    .exists().withMessage('end_work_hour must not be empty')
    .isISO8601(),

  body('is_holiday')
    .isBoolean().withMessage('is_holiday must be a valid boolean')
    .optional(),

  body('is_weekend')
    .isBoolean().withMessage('is_weekend must be a valid boolean')
    .optional(),
];

exports.updatefields = [
  body('_id')
    .isEmpty().withMessage('_id must not be specified'),
  //  TODO: fix these date checks properly with a custom validator in next update
  body('work_date')
    .isISO8601().withMessage('work_date must be a valid date')
    .optional(),

  body('start_work_hour')
    .isISO8601().withMessage('start_work_hour must be a valid date')
    .optional(),

  body('end_work_hour')
    .isISO8601().withMessage('end_work_hour must be a valid date')
    .optional(),

  body('is_holiday')
    .isBoolean().withMessage('is_holiday must be a valid boolean')
    .optional(),

  body('is_weekend', 'must specify a valid boolean')
    .isBoolean().withMessage('is_weekend must be a valid boolean')
    .optional(),
];
