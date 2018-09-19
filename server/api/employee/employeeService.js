const mongoose = require('mongoose');
const crypto = require('crypto');
const moment = require('moment');
const Employee = require('./employeeModel');
const Job = require('../job/jobModel');
const Wallet = require('../wallet/walletModel');
const Workhours = require('../workhours/workhoursModel');
const User = require('../user/userModel');
const {
  cloneProperties,
  capitalizeFirstLetter,
  populate,
  hasKeys,
} = require('../../utils/utils');
// TODO: extract populate from methods and make it seperate only ?

class EmployeeService {
  /**
     * calls the employee table with conditions and returns matching employees it finds
     * @param {Object} conditions which conditions the request wants it by
     * @returns {Promise} a promise
     */
  static findAllEmployees(conditions) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(conditions)) reject(new Error('array is not an object'));

      if (typeof conditions !== 'object') reject(new Error(`${typeof conditions} is not an object`));

      resolve(Employee.find(conditions, 'firstName lastName phoneNumber links'));
    });
  }

  /**
     * finds an employee with the given id in the employees table
     * @param {string} id id to find employee by
     * @returns {Promise} a promise
     */
  static findEmployeeById(id) {
    return new Promise((resolve, reject) => {
      if (typeof id !== 'string') reject(new Error(`${typeof id} is not a string`));

      resolve(Employee.findOne({ _id: id }));
    });
  }

  /**
     * finds an employee with given id and updates the employee with the given object
     * @param {object} obj object with properties to update
     * @param {string} id id of the employee to update
     * @returns a promise
     */
  static updateEmployeeById(obj, id) {
    // sets the obj property to the found employee, and returns the new version
    return new Promise((resolve, reject) => {
      if (typeof id !== 'string') reject(new Error(`${typeof id} is not a string`));

      if (Array.isArray(obj)) reject(new Error('array is not an object'));

      if (typeof obj !== 'object') reject(new Error(`${typeof obj} is not an object`));


      resolve(Employee.findOneAndUpdate({ _id: id }, { $set: obj }, { new: true }));
    });
  }

  /**
     * finds an employee with the given id and deletes it from the table
     * @param {string} id id to delete employee by
     * @return {promise} a promise
     */
  static deleteEmployeeById(id) {
    return new Promise((resolve, reject) => {
      if (typeof id !== 'string') reject(new Error(`${typeof id} is not a string`));

      resolve(Employee.findOneAndDelete({ _id: id }));
    });
  }

  /**
     * populates an objects field with selected fields
     * @param {object} obj the object to populate
     * @param {string} path the field/path to populate
     * @param {string} select the fields of the populated object
     * @returns {promise} returns a promise
     */
  static populate(obj, path, select) {
    return populate(Employee, obj, path, select);
  }

  /**
     * create an employee in the database
     * @param {object} employee the employee object to create in the database
     * @returns {promise} a promise to be resolved
     */
  static createEmployee(employee) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(employee)) reject(new Error('array is not an object'));

      if (typeof employee !== 'object') reject(new Error(`${typeof employee} is not an object`));

      const createAll = [
        Job.create({
          _Owner: employee._id,
        }),
        Wallet.create({
          _Owner: employee._id,
        }),
        Workhours.create({
          _Owner: employee._id,
        }),
        User.create(employee.user),
      ];
      // TODO test is this works
      Promise.all(createAll);
      resolve(Employee.create(employee));
    });
  }

  /**
     * creates an object template resembling the employee model
     * @param {object} employee the employee to create the object for
     * @param {object} user the user to be created alongside it
     * @returns {object} an object resembling the employee model
     */
  static async createEmployeeObject(employee, user) {
    if (Array.isArray(employee)) throw new Error('array is not an object');
    if (typeof employee !== 'object') throw new Error(`${typeof employee} is not an object`);

    const newUser = user || {};
    let role;
    if (newUser.role) {
      role = capitalizeFirstLetter(newUser.role);
    }
    if (!newUser.role) {
      role = 'Employee';
    }
    return {
      _id: new mongoose.Types.ObjectId(),
      firstName: employee.firstName,
      lastName: employee.lastName,
      birthday: moment(employee.birthday, 'YYYY/MM/DD'),
      email: employee.email,
      city: employee.city,
      country: employee.country,
      user: {
        _id: new mongoose.Types.ObjectId(),
        username: newUser.username || `${employee.firstName.substring(0, 2)}${employee.lastName.substring(0, 2)}`,
        email: employee.email,
        role,
        password: newUser.password || await crypto.randomBytes(12).toString('hex'),
      },
      street: employee.street,
      phoneNumber: employee.phoneNumber,
      startDate: employee.startDate || moment().format('YYYY/MM/DD'),
      lastChanged: moment().format('YYYY/MM/DD'),
    };
  }

  /**
     * checks if an object has any keys
     * @param {object} obj
     * @returns {boolean} true or false
     */
  static hasKeys(obj) {
    return hasKeys(obj);
  }

  /**
     * takes an object and return a new object without the excluded fields
     * also updates lastchanged field
     * @param {object} obj object to copy
     * @param {string} fields fields to exclude
     */
  static copyObjectAndAddLastChanged(obj, fields) {
    const newObj = cloneProperties(obj, fields);
    newObj.lastChanged = moment().format('YYYY/MM/DD');
    return newObj;
  }
}

module.exports = EmployeeService;
