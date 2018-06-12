import express from 'express';
import workerRouter from './worker/workerRouter';
import walletRouter from './wallet/walletRouter';
import jobRouter from './job/jobRouter';
import workhoursRouter from './workhours/workhoursRouter';

const router = express.Router();

router.use('/worker', workerRouter);
router.use('/worker/:id/wallet', walletRouter);
router.use('/worker/:id/job', jobRouter);
router.use('/worker/:id/workhours', workhoursRouter);

export default router;
