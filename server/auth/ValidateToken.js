import jwt from 'jsonwebtoken';
import config from '../config/config';

function splitUrl(url) {
  return url.split('/');
}

function validateToken() {
  return (req, res, next) => {
    const splitUpUrl = splitUrl(req.originalUrl);

    if (splitUpUrl.includes('auth')) {
      return next();
    }
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    try {
      const decoded = jwt.verify(token, config.secret);
      req.userId = decoded.id;
      return next();
    } catch (error) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
  };
}

export default validateToken;
