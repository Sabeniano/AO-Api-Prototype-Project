const chai = require('chai');
const should = chai.should();
const sinon = require('sinon');
const employeeController = require('./employeeController');

describe('Employee Controller Unit Testing', () => {
  describe('GetAllEmployees', () => {
    beforeEach(() => {
      const employeeControllerstub = sinon.stub(employeeController, 'GetAllEmployees');
      employeeControllerstub.returns({ status: 200, documents: { count: 20, employees: [] } });
      employeeController.GetAllEmployees({}, {}, () => {});
    });
    afterEach(() => {
      employeeController.GetAllEmployees.restore();
    });
    it('should be called once', () => {
      employeeController.GetAllEmployees.calledOnce.should.be.true;
    });
    it('should be called with req, res, next', () => {
      employeeController.GetAllEmployees.args[0][0].should.be.an('object');
      employeeController.GetAllEmployees.args[0][1].should.be.an('object');
      employeeController.GetAllEmployees.args[0][2].should.be.an('function');
    });
    it('should return an object', () => {
      employeeController.GetAllEmployees.returnValues[0].should.be.an('object');
    });
    it('should have a status property', () => {
      employeeController.GetAllEmployees.returnValues[0].should.have.property('status');
    });
    it('should have an documents property', () => {
      employeeController.GetAllEmployees.returnValues[0].should.have.property('documents');
    });
    it('should return status code of 200', () => {
      employeeController.GetAllEmployees.returnValues[0].status.should.be.equal(200);
    });
    it('should return an array with found employees', () => {
      employeeController.GetAllEmployees.returnValues[0].documents.employees.should.be.an('array');
    });
    it('should return an array with the length of 20', () => {
      employeeController.GetAllEmployees.returnValues[0].documents.count.should.be.equal(20);
    });
  });
});