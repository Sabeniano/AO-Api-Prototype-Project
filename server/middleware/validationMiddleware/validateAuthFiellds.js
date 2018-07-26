const { body } = require('express-validator/check');

exports.createfields = [
  body('username', 'must specify a username').exists().isString(),
  body('email', 'must specify a valid email').exists().isString().isEmail(),
  body('role', 'must specify a valid email').isString(),
  body('password', 'must specify a password').exists().isString(),
];

exports.signinFields = [
  body('username', 'must specify a username').exists().isString(),
  body('password', 'must specify a password').exists().isString(),
]

exports.updatefields = [
  body('_id', 'must not be specified').isEmpty(),
  body('username', 'must specify a username').isString(),
  body('email', 'must specify an email').isString().isEmail(),
  body('role', 'must be a valid email').isString(),
  body('password', 'must specify a password').isString(),
];
