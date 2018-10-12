const { body } = require('express-validator/check');

exports.updateFields = [

    body('totalHoursThisPaycheck')
    .isNumeric().withMessage('totalHoursThisPaycheck must be a valid number')
    .optional(),

    body('totalOvertimeHoursThisPaycheck')
    .isNumeric().withMessage('totalOvertimeHoursThisPaycheck must be a valid number')
    .optional(),
];