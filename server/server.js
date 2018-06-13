import express from 'express';
import api from './api/api';
import middleware from './middleware/middleware';

const app = express();

middleware(app);

app.use('/api/v1/', api);

export default app;
