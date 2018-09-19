const redis = require('redis');

const client = redis.createClient('6379', '127.0.0.1', { no_ready_check: true });


const redisMiddleware = (req, res, next) => {
  const key = "__redisKEY__" + req.originalUrl || req.url;
  client.get(key, (err, reply) => {
    if (reply) {
      res.send(reply);
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        client.set(key, JSON.stringify(body), 'EX', 120); // The last parameter is to choose how many seconds you want to have the key in the DB
        res.sendResponse(body);
      };
      next();
    }
  });
};

module.exports = redisMiddleware;
