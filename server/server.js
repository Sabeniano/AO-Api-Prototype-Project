import express from 'express';
import api from './api/api';
import middleware from './middleware/middleware';

const app = express();

middleware(app);

app.use('/api/v1/', api);


//  catch in case no endpoint is hit
// app.use((req, res, next) => {
//   const error = new Error('Route Not Found');
//   error.status = 404;
//   next(error);
// });

export default app;
