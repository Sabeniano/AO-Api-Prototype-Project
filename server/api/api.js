const router = require('express').Router();
const verifyToken = require('../middleware/authMiddleware/verifyToken');
const getFullUser = require('../middleware/authMiddleware/getFullUser');
const verifyRole = require('../middleware/authMiddleware/verifyRole');
const employeeRouter = require('./employee/employeeRouter');
const walletRouter = require('./wallet/walletRouter');
const jobRouter = require('./job/jobRouter');
const workhoursRouter = require('./workhours/workhoursRouter');
const scheduleRouter = require('./schedule/scheduleRouter');
const userRoutes = require('./user/userRouter');

const verifyTokenAndGetUser = [verifyToken(), getFullUser()];

router.use('/users', verifyTokenAndGetUser, verifyRole(), userRoutes);
router.use('/employees', verifyTokenAndGetUser, employeeRouter);
router.use('/employees/:id/wallet', verifyTokenAndGetUser, walletRouter);
router.use('/employees/:id/job', verifyTokenAndGetUser, jobRouter);
router.use('/employees/:id/workhours', verifyTokenAndGetUser, workhoursRouter);
router.use('/employees/:id/schedules', verifyTokenAndGetUser, scheduleRouter);

module.exports = router;
