import express from 'express';
import apiRoutes from './api/api';
import middleware from './middleware/middleware';
import authRoutes from './user/userRouter';

const app = express();

middleware(app);

app.use('/api/v1/', apiRoutes);
app.use('/auth', authRoutes);

//  catch in case no endpoint is hit
// app.use((req, res, next) => {
//   const error = new Error('Route Not Found');
//   error.status = 404;
//   next(error);
// });

export default app;
