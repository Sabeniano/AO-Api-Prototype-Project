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
};

const config = {
  dev,
  test,
};

export default config[env];
