const { body } = require('express-validator/check');

exports.createFields = [
  body('firstName', 'must specify a valid first name').exists().isString(),
  body('lastName', 'must specify a valid last name').exists().isString(),
  body('birthday', 'must specify a valid date').exists().isISO8601().isBefore(Date.now().toString()),
  body('email', 'must specify a valid email').exists().isString().isEmail(),
  body('city', 'must specify a valid city').exists().isString(),
  body('country', 'must specify a country').exists().isString().exists(),
  body('street', 'must specify a street').exists().isString(),
  body('phoneNumber', 'must specify a mobile phone number').exists().isNumeric().isMobilePhone(),
  body('startDate', 'must specify a validate date').isISO8601(),
  body('lastChanged', 'must be left empty').isEmpty(),
];

exports.updateFields = [
  body('_id', 'must not be specified').isEmpty(),
  body('birthday', 'field must be older than right now').isISO8601().isBefore(Date.now().toString()),
  body('email', 'email must be valid').isString().isEmail(),
  body('city', 'must specify a city').isString(),
  body('country', 'must specify a country').isString(),
  body('street', 'must specify a street').isString(),
  body('phoneNumber', 'must specify a mobile phone number').isNumeric().isMobilePhone(),
  body('user', 'must be empty').isEmpty(),
  body('startDate', 'must specify a validate date').isISO8601(),
  body('lastChanged', 'must be left empty').isEmpty(),
];
