const { body } = require('express-validator/check');

exports.updateFields = [
    
    body('salary', 'Must be a valid number')
      .isNumeric().withMessage('salary must be a number')
      .optional(),
      
    body('wage', 'Must be a valid number')
    .isNumeric().withMessage('wage must be a number')
    .optional(),

    
    body('paymentMethod', 'Must be a valid paymentMethod type')
      .isString().withMessage('paymentMethod must be a string')
      .custom((value) => {
        const values = ['monthly', 'hourly'];
        return values.includes(value.toLowerCase());
      })
      .withMessage('paymentMethod must be a valid paymentMethod')
      .optional(),
];