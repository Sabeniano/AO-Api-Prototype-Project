const { body } = require('express-validator/check');

exports.createfields = [
  body('work_date', 'must specify a valid date').exists().isISO8601(),
  body('start_work_hour', 'must specify a valid date').exists().isISO8601(),
  body('end_work_hour', 'must specify a valid date').exists().isISO8601(),
  body('is_holiday', 'must specify a valid boolean').isBoolean(),
  body('is_weekend', 'must specify a valid boolean').isBoolean(),
];

exports.updatefields = [
  body('_id', 'must not be specified').isEmpty(),
  body('work_date', 'must specify a valid date').isISO8601(),
  body('start_work_hour', 'must specify a valid date').isISO8601(),
  body('end_work_hour', 'must specify a valid date').isISO8601(),
  body('is_holiday', 'must specify a valid boolean').isBoolean(),
  body('is_weekend', 'must specify a valid boolean').isBoolean(),
];
