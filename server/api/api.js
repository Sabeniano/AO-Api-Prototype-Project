import express from 'express';
import employeeRouter from './employee/employeeRouter';
// import walletRouter from './wallet/walletRouter';
// import jobRouter from './job/jobRouter';
// import workhoursRouter from './workhours/workhoursRouter';
// import scheduleRouter from './schedule/scheduleRouter';

const router = express.Router();

router.use('/employee', employeeRouter);
// router.use('/employee/:id/wallet', walletRouter);
// router.use('/employee/:id/job', jobRouter);
// router.use('/employee/:id/workhours', workhoursRouter);
// router.use('/employee/:id/schedule', scheduleRouter);

export default router;
