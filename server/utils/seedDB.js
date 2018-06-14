import faker from 'faker';
import seeddebug from 'debug';
import employees from '../api/employee/employeeModel';
import jobs from '../api/job/jobModel';
import wallets from '../api/wallet/walletModel';
// import workhours from '../api/workhours/workhoursModel';
import users from '../user/userModel';

/* eslint-disable no-underscore-dangle */

const debug = seeddebug('seed');

const genEmployees = [];
const genJobs = [];
const genWallets = [];
// const genWorkhours = [];
const genUsers = [];


for (let index = 0; index < 20; index += 1) {
  const employeeSeed = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthday: faker.date.past(),
    address: faker.address.streetAddress(),
    phoneNumber: parseInt(faker.phone.phoneNumber('########'), 10),
  };

  const jobSeed = {
    jobTitle: faker.name.jobTitle(),
    description: faker.name.jobDescriptor(),
  };

  const walletSeed = {
    wage: faker.finance.amount(),
    salary: faker.finance.amount(),
    paymentMethod: faker.random.arrayElement(['Monthly', 'Hourly']),
  };

  // const workhourSeed = {
    // totalHoursThisPaycheck: Number,
    // totalOvertimeHoursThisPaycheck: Number,
  // };

  const userSeed = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.exampleEmail(),
  };

  genEmployees.push(employeeSeed);
  genJobs.push(jobSeed);
  genWallets.push(walletSeed);
  // genWorkhours.push(workhourSeed);
  genUsers.push(userSeed);
}

export default async function () {
  try {
    await employees.remove();
    await jobs.remove();
    await wallets.remove();
    // await workhours.remove();
    await users.remove();

    const jobsDocuments = await jobs.create(genJobs);

    for (let i = 0; i < genJobs.length; i += 1) {
      genEmployees[i].jobs_id = jobsDocuments[i]._id;
    }

    const employeeDocuments = await employees.create(genEmployees);

    for (let i = 0; i < genEmployees.length; i += 1) {
      genWallets[i].employees_id = employeeDocuments[i]._id;
      // genWorkhours[i].employees_id = employeeDocuments[i]._id;
    }

    await wallets.create(genWallets);
    // await workhours.create(genWorkhours);
    await users.create(genUsers);

    debug('Removed and seeded DB');
  } catch (error) {
    debug(error);
  }
}
