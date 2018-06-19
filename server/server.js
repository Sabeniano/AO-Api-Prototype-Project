import express from 'express';
import apiRoutes from './api/api';
import middleware from './middleware/middleware';
import authRoutes from './user/userRouter';
import sendError from './utils/sendError';
import handleError from './utils/errorHandling';

const app = express();

middleware(app);

app.use('/api/v1/', apiRoutes);
app.use('/auth', authRoutes);

//  if no endpoint is hit
app.use(sendError(400, 'route not found'));
app.use(handleError());

export default app;
