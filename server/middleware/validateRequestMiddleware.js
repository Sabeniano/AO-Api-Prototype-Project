import jwt from 'jsonwebtoken';
import auth from '../auth/auth';
import config from '../config/config';

function ValidateRequestMiddleware() {
  return (req, res, next) => {
    try {
      const tokenIncluded = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
      const keyIncluded = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

      if (tokenIncluded || tokenIncluded) {
        const decoded = jwt.verify(tokenIncluded, config.secret);
      }
    } catch (error) {

    }
  },
}

export default ValidateRequestMiddleware;