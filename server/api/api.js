import express from 'express';
import personRouter from './person/personRouter';
import walletRouter from './wallet/walletRouter';
import jobRouter from './job/jobRouter';
import workRouter from './work/workRouter';

const router = express.Router();

router.use('/people', personRouter);
router.use('/people/:id/wallet', walletRouter);
router.use('/people/:id/job', jobRouter);
router.use('/people/:id/work', workRouter);

export default router;
