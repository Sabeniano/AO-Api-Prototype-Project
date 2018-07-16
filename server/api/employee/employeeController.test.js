const should = require('chai').should();
const expect = require('chai').expect;
const chai = require('chai');
const sinon = require('sinon');
const http_mocks = require('node-mocks-http');
const employeeController = require('./employeeController');
const Employee = require('./employeeModel');

chai.should();

function buildReponse() {
  return http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
};


describe('employeeController', () => {
  describe('FindResource', () => {
    it('should return all employees', (done) => {
      const employeeMock = sinon.mock(Employee);
      const expectedResult = {status: true , employee: [] }
      employeeMock.expects('find').yields(null, expectedResult);
      Employee.find((error, result) => {
        employeeMock.verify();
        employeeMock.restore();
        result.status.should.be.true;
        done();
      })
    });
  });
  describe('FindResourceById', () => {
    it('should return one employee')
          
  });
});