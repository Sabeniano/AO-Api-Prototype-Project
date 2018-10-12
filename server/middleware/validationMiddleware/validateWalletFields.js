const { body } = require('express-validator/check');

exports.updateFields = [
  body('_id')
    .isEmpty().withMessage('_id must be empty'),

  body('wage')
    .isNumeric().withMessage('wage must be a number')
    .optional(),

  body('salary')
    .isNumeric().withMessage('salary must be a number')
    .optional(),

  body('paymentMethod')
    .isString().withMessage('payementMethod must be a string')
    .custom((value) => {
      const paymentMethods = ['hourly', 'monthly'];
      return paymentMethods.includes(value.toLowerCase());
    })
    .withMessage('must be a valid payementMethod')
    .optional(),

  body('_Owner')
    .isEmpty().withMessage('_Owner must be empty'),

  //  TODO: fix these date checks properly with a custom validator in next update
  body('lastChanged')
    .isEmpty().withMessage('lastChanged must be empty'),
];
