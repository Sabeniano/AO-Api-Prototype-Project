const router = require('express').Router();
const verifyToken = require('../middleware/authMIddleware/verifyToken');
const getFullUser = require('../middleware/authMIddleware/getFullUser');
const verifyRole = require('../middleware/authMIddleware/verifyRole');
const employeeRouter = require('./employee/employeeRouter');
const walletRouter = require('./wallet/walletRouter');
const jobRouter = require('./job/jobRouter');
const workhoursRouter = require('./workhours/workhoursRouter');
const scheduleRouter = require('./schedule/scheduleRouter');

const verifyTokenAndGetUser = [verifyToken(), getFullUser()];

router.use('/users', verifyTokenAndGetUser, verifyRole(), userRoutes);
router.use('/employee', verifyTokenAndGetUser, employeeRouter);
router.use('/employee/:id/wallet', verifyTokenAndGetUser, walletRouter);
router.use('/employee/:id/job', verifyTokenAndGetUser, jobRouter);
router.use('/employee/:id/workhours', verifyTokenAndGetUser, workhoursRouter);
router.use('/employee/:id/schedules', verifyTokenAndGetUser, scheduleRouter);

module.exports = router;
