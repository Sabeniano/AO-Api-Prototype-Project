const moment = require('moment');
const { body } = require('express-validator/check');
const Employee = require('../../api/employee/employeeModel');

exports.createFields = [
  body('firstName')
    .exists().withMessage('firstName must not be empty')
    .isString()
    .withMessage('firstName must be a string'),

  body('lastName')
    .exists().withMessage('lastName must not be empty')
    .isString()
    .withMessage('lastName must be a string'),

  body('birthday')
    .exists().withMessage('birthday must not be empty')
    .custom((birthday) => {
      const date = new Date();
      const parsedDate = new Date(birthday);
      if (parsedDate && parsedDate < date.setFullYear(date.getFullYear() - 15)) {
        return true;
      }
      return false;
    })
    .withMessage('birthday must be a valid date that is at least 15 years old'),

  body('email')
    .exists().withMessage('email must not be empty')
    .isString()
    .withMessage('email must be a string')
    .isEmail()
    .withMessage('email must be a valid email')
    .custom(async (email) => {
      const foundEmployee = await Employee.findOne({ email });
      if (!foundEmployee) {
        return true;
      }
      return false;
    })
    .withMessage('email already exists'),

  body('city')
    .exists().withMessage('city must not be empty')
    .isString()
    .withMessage('city must be a string'),

  body('country')
    .exists().withMessage('country must not be empty')
    .isString()
    .withMessage('country must be a string'),

  body('street')
    .exists().withMessage('street must not be empty')
    .isString()
    .withMessage('street must be a string'),

  body('phoneNumber')
    .exists().withMessage('phoneNumber must not be empty')
    .isNumeric()
    .withMessage('phoneNumber must be a number')
    .isMobilePhone('da-DK')
    .withMessage('phoneNumber must be a valid phone number'),

  body('startDate')
    .custom((startDate) => {
      console.log(Date.parse(startDate));
      if (Date.parse(startDate)) {
        return true;
      }
      return false;
    })
    .withMessage('startDate must be a valid date'),
];

exports.updateFields = [
  body('_id', 'must not be specified').isEmpty(),
  body('birthday')
    .custom((birthday) => {
      const date = new Date();
      const parsedDate = new Date(birthday);
      if (parsedDate && parsedDate < date.setFullYear(date.getFullYear() - 15)) {
        return true;
      }
      return false;
    })
    .withMessage('birthday must be a valid date that is at least 15 years old')
    .optional(),

  body('email')
    .isString().withMessage('email must be a string')
    .isEmail()
    .withMessage('email must be a valid email')
    .optional(),

  body('city')
    .isString().withMessage('city must be a string')
    .optional(),

  body('country')
    .isString().withMessage('country must be a string')
    .optional(),

  body('street')
    .isString().withMessage('street must be a string')
    .optional(),

  body('phoneNumber')
    .isNumeric().withMessage('phoneNumber must be a number')
    .isMobilePhone('da-DK')
    .withMessage('phoneNumber must be a valid number')
    .optional(),

  body('user', 'must be empty')
    .isEmpty(),

  body('startDate')
    .custom((startDate) => {
      console.log(Date.parse(startDate));
      if (Date.parse(startDate)) {
        return true;
      }
      return false;
    })
    .withMessage('startDate must be a valid date')
    .optional(),
];
