import express from 'express';
import apiRoutes from './api/api';
import authRoutes from './auth/authRouter';
import userRoutes from './user/userRouter';
import middleware from './middleware/middleware';

const app = express();

middleware(app);

app.use('/api/v1/', apiRoutes);
app.use('/api/v1/auth/', authRoutes);
app.use('/api/v1/users/', userRoutes);

//  catch in case no endpoint is hit
// app.use((req, res, next) => {
//   const error = new Error('Route Not Found');
//   error.status = 404;
//   next(error);
// });

export default app;
