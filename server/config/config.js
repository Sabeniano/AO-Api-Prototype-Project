const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT, 10) || 3000,
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: parseInt(process.env.DEV_DB_PORT, 10) || 27017,
    name: process.env.DEV_DB_NAME || 'aoe',
  },
  jwt: {
    secret: process.env.DEV_JWT_SECRET ||'secrettesting',
    expireTime: process.env.DEV_JWT_EXPIRES || '1h',
  }
};

const test = {
  app: {
    port: parseInt(process.env.TEST_APP_PORT, 10) || 3000,
  },
  db: {
    host: process.env.TEST_DB_HOST || 'localhost',
    port: parseInt(process.env.TEST_DB_PORT, 10) || 27017,
    name: process.env.TEST_DB_NAME || 'aoe_test',
  },
  secret: process.env.DEV_SECRET,
};

const prod = {
  app: {
    port: parseInt(process.env.PROD_APP_PORT, 10),
  },
  db: {
    host: process.env.PROD_DB_HOST,
    port: parseInt(process.env.PROD_DB_PORT, 10),
    name: process.env.PROD_DB_NAME,
  },
  secret: process.env.PROD_SECRET,
};

const config = {
  dev,
  test,
  prod,
};


module.exports =  config[env];
