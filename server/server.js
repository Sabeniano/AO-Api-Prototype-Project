const express = require('express');
const apiRoutes = require('./api/api');
const middleware = require('./middleware/middleware');
const authRoutes = require('./user/userRouter');
const sendError = require('./utils/sendError');
const handleError = require('./utils/errorHandling');

const app = express();

middleware(app);

app.use('/api/v1/', apiRoutes);
app.use('/auth', authRoutes);

//  if no endpoint is hit
app.use(sendError(400, 'route not found'));
app.use(handleError());

module.exports = app;
