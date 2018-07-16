const faker = require('faker');
const logger = require('./loggerWrapper');
const mongoose = require('mongoose');
const Employees = require('../api/employee/employeeModel');
const Jobs = require('../api/job/jobModel');
const Schedules = require('../api/schedule/scheduleModel');
const Wallets = require('../api/wallet/walletModel');
const Workhours = require('../api/workhours/workhoursModel');

const genEmployees = [];
const genJobs = [];
const genSchedules = [];
const genWallets = [];
const genWorkhours = [];


for (let index = 0; index < 20; index += 1) {


  const employeeSeed = {
    _id: mongoose.Types.ObjectId(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthday: faker.date.past(),
    city: faker.address.city,
    country: faker.address.country,
    street: faker.address.streetAddress,
    phoneNumber: parseInt(faker.phone.phoneNumber('########'), 10),
    startDate: faker.date.past(),
    lastChanged: faker.date.past(),
    links: [],
  };


  const jobSeed = {
    _id: mongoose.Types.ObjectId(),
    jobTitle: faker.random.arrayElement(['Administrator', 'Medarbejder', 'IT-Support']),
    employee_id: employeeSeed._id,
    description: faker.name.jobDescriptor(),
    permissions: [faker.random.arrayElement(['Create', 'Read', 'Update', 'Delete'])],
    links: [],
  };

  const scheduleSeed = {
    _id: mongoose.Types.ObjectId(),
    employee_id: employeeSeed._id,
    work_date: faker.date.future(),
    start_work_hour: faker.date.future(),
    end_work_hour: faker.date.future(),
    is_holiday: faker.random.boolean(),
    is_weekend: faker.random.boolean(),
    links: [],
  }

  const walletSeed = {
    _id: mongoose.Types.ObjectId(),
    wage: faker.finance.amount(),
    salary: faker.finance.amount(),
    paymentMethod: faker.random.arrayElement(['Monthly', 'Hourly']),
    employees_id: employeeSeed._id,
    lastChanged: faker.date.past(),
    links: [],
  };

  const workhourSeed = {
    _id: mongoose.Types.ObjectId(),
    employees_id: employeeSeed._id,
    totalHoursThisPaycheck: faker.random.number(),
    totalOvertimeHoursThisPaycheck: faker.random.number(),
    links: [],
  };

  genEmployees.push(employeeSeed);
  genJobs.push(jobSeed);
  genSchedules.push(scheduleSeed);
  genWallets.push(walletSeed);
  genWorkhours.push(workhourSeed);
}


module.exports = async function () {
  try {
    await Employees.remove();
    await Jobs.remove();
    await Schedules.remove();
    await Wallets.remove();
    await Workhours.remove();

    await Employees.create(genEmployees);
    await Jobs.create(genJobs);
    await Schedules.create(genSchedules);
    await Wallets.create(genWallets);
    await Workhours.create(genWorkhours);

    logger.log('Removed and seeded DB');
  } catch (error) {
    logger.log(error, 'error');
  }
}
