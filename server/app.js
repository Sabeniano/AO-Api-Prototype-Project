const express = require('express');
const apiRoutes = require('./api/api');
const middleware = require('./middleware/middleware');
const authRoutes = require('./user/userRouter');
const handleError = require('./utils/errorHandling');

const app = express();

middleware(app);

app.use('/api/v1/', apiRoutes);
app.use('/auth', authRoutes);

//  if no endpoint is hit
app.use((req, res, next) => {
  const error = new Error('Resource not found');
  error.status = 404;
  next(error);
});
app.use(handleError());

module.exports = app;
