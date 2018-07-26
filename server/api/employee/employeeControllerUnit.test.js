const chai = require('chai');

const should = chai.should();
const sinon = require('sinon');
const employeeController = require('./employeeController');
const Employee = require('./employeeModel');

describe('Employee Controller Unit Testing', () => {
  describe('GetAllEmployees', () => {
    describe('Successful Request Found Employees', () => {
      const req = {
        params: {
          id: '424454',
        },
        query: {
  
        },
        originalUrl: 'TEST',
        headers: {
          host: 'TEST',
        },
      };
      const res = {
        json: sinon.spy(),
        status(statuscode) {
          return this;
        },
      };
      before(async () => {
        sinon.stub(Employee, 'find').returns([{
          firstName: 'John',
          lastName: 'Smith',
          Phonenumber: '41415465',
          links: [],
          SetUpHyperLinks: () => null,
        }]);
        await employeeController.GetAllEmployees(req, res, (error) => { throw error; });
      });
      after(() => {
        Employee.find.restore();
      });
      it('should not throw', async () => {
        await employeeController.GetAllEmployees(req, res, () => (error) => { throw error; }).should.not.throw;
      });
      it('should call res.json()', () => {
        res.json.called.should.be.true;
      });
      it('should call res.status() with statuscode 200', async () => {
        const resStatus = {
          json: sinon.spy(),
          status(statuscode) {
            statuscode.should.be.equal(200);
            return this;
          },
        };
        await employeeController.GetAllEmployees(req, resStatus, (error) => { throw error; });
      });
      it('res.json() should return an object', () => {
        res.json.args[0][0].should.be.an('object');
      });
      it('res.json() should return an object with the properties "count" and "employees"', () => {
        res.json.args[0][0].should.have.property('count');
        res.json.args[0][0].should.have.property('employees');
      });
      it('res.json() should return with a count of more than 0', () => {
        res.json.args[0][0].count.should.be.above(0);
      });
      it('res.json() should return with an array of employees', () => {
        res.json.args[0][0].employees.should.be.an('array');
      });
      it('res.json() should return with an array of employees with length bigger than 0', () => {
        res.json.args[0][0].employees.length.should.be.above(0);
      });
    });
    describe('Successful Request Found No Employees', () => {
      const req = {
        params: {
          id: '424454',
        },
        query: {
  
        },
        originalUrl: 'TEST',
        headers: {
          host: 'TEST',
        },
      };
      const res = {
        json: sinon.spy(),
        status(statuscode) {
          return this;
        },
      };
      before(async () => {
        sinon.stub(Employee, 'find').returns([]);
        await employeeController.GetAllEmployees(req, res, () => (error) => { throw error; });
      });
      after(() => {
        Employee.find.restore();
      });
      it('should not throw', async () => {
        await employeeController.GetAllEmployees(req, res, () => (error) => { throw error; }).should.not.throw;
      });
      it('should call res.json()', () => {
        res.json.called.should.be.true;
      });
      it('should call res.status() with statuscode 200', async () => {
        const resStatus = {
          json: sinon.spy(),
          status(statuscode) {
            statuscode.should.be.equal(204);
            return this;
          },
        };
        await employeeController.GetAllEmployees(req, resStatus, (error) => { throw error; });
      });
      it('res.json() should return an object', () => {
        res.json.args[0][0].should.be.an('object');
      });
      it('res.json() should return an object with the properties "count" and "employees"', () => {
        res.json.args[0][0].should.have.property('count');
        res.json.args[0][0].should.have.property('employees');
      });
      it('res.json() should return with a count of 0', () => {
        res.json.args[0][0].count.should.be.equal(0);
      });
      it('res.json() should return with an array of employees', () => {
        res.json.args[0][0].employees.should.be.an('array');
      });
      it('res.json() should return with an array of employees with length bigger equal to 0', () => {
        res.json.args[0][0].employees.length.should.be.equal(0);
      });
    });
    describe('Unsuccessfull Request, Error With Database', () => {
      const req = {
        params: {
          id: '424454',
        },
        query: {
  
        },
        originalUrl: 'TEST',
        headers: {
          host: 'TEST',
        },
      };
      const res = {
        json: sinon.spy(),
        status(statuscode) {
          return this;
        },
      };
      const next = sinon.spy();
      before(async () => {
        sinon.stub(Employee, 'find').throws();
        await employeeController.GetAllEmployees(req, res, next);
      });
      after(() => {
        Employee.find.restore();
      });
      // it('should throw', async () => {
      //   await employeeController.GetAllEmployees(req, res, next).should.throw;
      // });
      it('Should not call res.json()', () => {
        res.json.calledOnce.should.be.false;
      });
      it('should call next()', () => {
        next.calledOnce.should.be.true;
      });
      it('should call next() with Error object ', () => {
        next.args[0][0].should.be.an('Error');
      });
    });
    describe('Unsuccessfull Request, Error With HATAEOS', () => {
      const req = {
        params: {
          id: '424454',
        },
        query: {
  
        },
        originalUrl: 'TEST',
        headers: {
          host: 'TEST',
        },
      };
      const res = {
        json: sinon.spy(),
        status(statuscode) {
          return this;
        },
      };
      const next = sinon.spy();
      before(async () => {
        sinon.stub(Employee, 'find').returns([{
          firstName: 'John',
          lastName: 'Smith',
          Phonenumber: '41415465',
          links: [],
          SetUpHyperLinks: () => { throw new Error(); },
        }]);
        await employeeController.GetAllEmployees(req, res, next);
      });
      after(() => {
        Employee.find.restore();
      });
      it('should throw error', async () => {
        await employeeController.GetAllEmployees(req, res, next).should.throw;
      });
      it('Should not call res.json()', () => {
        res.json.calledOnce.should.be.false;
      });
      it('should call next()', () => {
        next.called.should.be.true;
      });
      it('should call next() with Error object ', () => {
        next.args[0][0].should.be.an('Error');
      });
    });
  });
  describe('GetEmployeeById', () => {
    describe('Successful Request Found Employee', () => {
    });
  });
});
