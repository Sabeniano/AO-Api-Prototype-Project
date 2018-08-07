const faker = require('faker');
const logger = require('./loggerWrapper');
const mongoose = require('mongoose');
const Employees = require('../api/employee/employeeModel');
const Jobs = require('../api/job/jobModel');
const Schedules = require('../api/schedule/scheduleModel');
const Wallets = require('../api/wallet/walletModel');
const Workhours = require('../api/workhours/workhoursModel');
const User = require('../api/user/userModel');

const genUsers = [];
const genEmployees = [];
const genJobs = [];
const genSchedules = [];
const genWallets = [];
const genWorkhours = [];


for (let index = 0; index < 20; index += 1) {

  const empId = new mongoose.Types.ObjectId();

  const userSeed = {
    _id: new mongoose.Types.ObjectId(),
    username: `${faker.random.word()}${faker.name.firstName()}`,
    email: faker.internet.email(),
    role: faker.random.arrayElement(['Master administrator', 'Administrative', 'Employee']),
    employee: empId,
    password: faker.random.word(),
  };

  const employeeSeed = {
    _id: empId,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    birthday: faker.date.past(),
    city: faker.address.city(),
    country: faker.address.country(),
    street: faker.address.streetAddress(),
    phoneNumber: parseInt(faker.phone.phoneNumber('########'), 10),
    startDate: faker.date.past(),
    lastChanged: faker.date.past(),
  };


  const jobSeed = {
    _id: new mongoose.Types.ObjectId(),
    jobTitle: faker.random.arrayElement(['Administrator', 'Medarbejder', 'IT-Support']),
    employee_id: employeeSeed._id,
    description: faker.name.jobDescriptor(),
    permissions: [faker.random.arrayElement(['Create', 'Read', 'Update', 'Delete'])],
  };

  const scheduleSeed = {
    _id: new mongoose.Types.ObjectId(),
    employee_id: employeeSeed._id,
    work_date: faker.date.future(),
    start_work_hour: faker.date.future(),
    end_work_hour: faker.date.future(),
    is_holiday: faker.random.boolean(),
    is_weekend: faker.random.boolean(),
  };

  const walletSeed = {
    _id: new mongoose.Types.ObjectId(),
    wage: faker.finance.amount(),
    salary: faker.finance.amount(),
    paymentMethod: faker.random.arrayElement(['Monthly', 'Hourly']),
    employee_id: employeeSeed._id,
    lastChanged: faker.date.past(),
  };

  const workhourSeed = {
    _id: new mongoose.Types.ObjectId(),
    employee_id: employeeSeed._id,
    totalHoursThisPaycheck: faker.random.number(),
    totalOvertimeHoursThisPaycheck: faker.random.number(),
  };
  genUsers.push(userSeed);
  genEmployees.push(employeeSeed);
  genJobs.push(jobSeed);
  genSchedules.push(scheduleSeed);
  genWallets.push(walletSeed);
  genWorkhours.push(workhourSeed);
}


module.exports = async () => {
  const deleteAll = [
    Employees.remove(),
    Jobs.remove(),
    Schedules.remove(),
    Wallets.remove(),
    Workhours.remove(),
    User.remove(),
  ];

  const createAll = [
    Employees.create(genEmployees),
    Jobs.create(genJobs),
    Schedules.create(genSchedules),
    Wallets.create(genWallets),
    Workhours.create(genWorkhours),
    User.create(genUsers),
    User.create({
      _id: new mongoose.Types.ObjectId(),
      username: 'test',
      email: faker.internet.email(),
      role: 'Master administrator',
      password: 'test',
      links: [],
    }),
  ];

  await Promise
    .all(deleteAll)
    .then(() => logger.log('Deleted all records in DB', 'info', true))
    .catch(error => logger.log(error, 'error'));

  await Promise
    .all(createAll)
    .then(() => logger.log('Seed DB', 'info', true))
    .catch(error => logger.log(error, 'error'));
};
