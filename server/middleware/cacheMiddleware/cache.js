const redis = require('redis');
const removeTrailingSlashes = require('../../utils/trailingSlashes');

const client = redis.createClient('6379', '127.0.0.1', { no_ready_check: true });

// Checks to see if the key is in the DB, takes the data in the DB if it is
// If not it will save the data from the URL, and save it for X amount of time

function redisMiddleware(duration) {
  return async (req, res, next) => {
    const newUrl = removeTrailingSlashes(req.originalUrl || req.url);
    const key = `__KEY__${newUrl}`;
    client.get(key, (err, reply) => {
      if (reply) {
        res.send(reply);
      } else {
        res.sendResponse = res.send;
        res.send = (body) => {
          client.set(key, body, 'EX', duration * 60); // The last parameter is to choose how many seconds you want to have the key in the DB
          res.sendResponse(body);
        };
        next();
      }
    });
  };
}

module.exports = redisMiddleware;
