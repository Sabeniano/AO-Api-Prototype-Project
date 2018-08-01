const moment = require('moment');
const { body } = require('express-validator/check');

exports.createFields = [
  body('firstName', 'must specify a first name').isString().exists(),
  body('lastName', 'must specify a last name').isString().exists(),
  body('birthday', 'must specify a valid date').isISO8601().isBefore(moment().format('YYYY-MM-DD')),
  body('email', 'must specify a valid email').isString().isEmail(),
  body('city', 'must specify a city').isString().exists(),
  body('country', 'must specify a country').isString().exists(),
  body('street', 'must specify a street').isString().exists(),
  body('phoneNumber', 'must specify a mobile phone number').isNumeric().isMobilePhone('da-DK'),
  body('startDate', 'must specify a validate date').isISO8601(),
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
