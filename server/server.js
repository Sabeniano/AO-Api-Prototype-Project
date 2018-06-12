import express from 'express';
import api from './api/api';
import middleware from './middleware/middleware';
import mongoose from 'mongoose';

mongoose.connect()

const app = express();

middleware(app);

app.use('/api/v1/', api);

export default app;
