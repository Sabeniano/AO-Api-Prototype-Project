const router = require('express').Router();
const employeeRouter = require('./employee/employeeRouter');
const walletRouter = require('./wallet/walletRouter');
const jobRouter = require('./job/jobRouter');
const workhoursRouter = require('./workhours/workhoursRouter');
const scheduleRouter = require('./schedule/scheduleRouter');

router.use('/employee', employeeRouter);
router.use('/employee/:id/wallet', walletRouter);
router.use('/employee/:id/job', jobRouter);
router.use('/employee/:id/workhours', workhoursRouter);
router.use('/employee/:id/schedules', scheduleRouter);

module.exports = router;
