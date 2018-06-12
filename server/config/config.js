const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
  app: {
    port: process.env.PORT || 3000
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'db'
  }
};

const test = {
  app: {
    port: process.env.PORT || 8000
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'test'
  }
};

const config = {
  dev,
  test
};

module.exports = config[env];
