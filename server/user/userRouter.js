import express from 'express';

const userRouter = express.Router();

userRouter.route('/')
  .get()
  .post();

userRouter.route('/:id')
  .get()
  .post()
  .delete();
