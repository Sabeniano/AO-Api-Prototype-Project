const chai = require('chai');

const should = chai.should();
const sinon = require('sinon');
const mongoose = require('mongoose');
const employeeController = require('./employeeController');
const Employee = require('./employeeModel');
const Job = require('../job/jobModel');
const Wallet = require('../wallet/walletModel');
const Workhours = require('../workhours/workhoursModel');
const User = require('../user/userModel');


describe('Employee Controller Unit Testing', () => {
  describe('GetAllEmployees', () => {
    describe('Successful Request Found Employees', () => {
      let find;
      let setupHyperLinks = sinon.spy();
      const req = {
        params: {
          id: '424454',
        },
        query: {},
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
        find = sinon.stub(Employee, 'find').returns([{
          firstName: 'John',
          lastName: 'Smith',
          Phonenumber: '41415465',
          links: [],
          SetUpHyperLinks: setupHyperLinks,
        }]);
        await employeeController.GetAllEmployees(req, res, (error) => { throw error; });
      });
      after(() => {
        Employee.find.restore();
      });
      it('should call Employee.find() and not throw', () => {
        find.called.should.be.true;
        find.should.not.throw;
      });
      it('should call Model.SetUpHyperLinks', () => {
        setupHyperLinks.called.should.be.true;
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
      let find;
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
        find = sinon.stub(Employee, 'find').returns([]);
        await employeeController.GetAllEmployees(req, res, () => (error) => { throw error; });
      });
      after(() => {
        Employee.find.restore();
      });
      it('should call Employee.find() and not throw', () => {
        find.called.should.be.true;
        find.should.not.throw;
      });
      it('should call res.json()', () => {
        res.json.called.should.be.true;
      });
      it('should call res.status() with statuscode 204', async () => {
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
      it('res.json() should return with an array of employees with length equal to 0', () => {
        res.json.args[0][0].employees.length.should.be.equal(0);
      });
    });
    describe('Unsuccessful Request, Error With Database', () => {
      let find;
      const req = {
        params: {
          id: '424454',
        },
        query: {},
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
        find = sinon.stub(Employee, 'find').throws();
        await employeeController.GetAllEmployees(req, res, next);
      });
      after(() => {
        Employee.find.restore();
      });
      it('should call Employee.find()', () => {
        find.called.should.be.true;
      });
      it('Employee.find() should throw', () => {
        find.should.throw;
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
    describe('Unsuccessful Request, Error With HATAEOS', () => {
      let find;
      let setupHyperLinks = sinon.stub().throws();
      const req = {
        params: {
          id: '424454',
        },
        query: {},
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
        find = sinon.stub(Employee, 'find').returns([{
          firstName: 'John',
          lastName: 'Smith',
          Phonenumber: '41415465',
          links: [],
          SetUpHyperLinks: setupHyperLinks,
        }]);
        await employeeController.GetAllEmployees(req, res, next);
      });
      after(() => {
        Employee.find.restore();
      });
      it('should call Employee.find() and not throw', () => {
        find.called.should.be.true;
        find.should.not.throw;
      });
      it('should call Model.SetUpHyperLinks()', () => {
        setupHyperLinks.called.should.be.true;
      });
      it('Model.SetUpHyperLinks() should throw', () => {
        setupHyperLinks.should.throw;
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
      let findOne;
      let setUpHyperLinks = sinon.spy();
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
        findOne = sinon.stub(Employee, 'findOne',).callsFake((condition) => {
          const db = [{
            _id: '424454',
            firstName: 'John',
            lastName: 'Smith',
            Phonenumber: '41415465',
            links: [],
            SetUpHyperLinks: setUpHyperLinks,
          }];
          let returnVal;
          for (let i = 0; i < db.length; i++) {
            if (db[i]._id === condition._id) {
              returnVal = db[i];
            }
          }
          return returnVal;
        })
        await employeeController.GetEmployeeById(req, res, next);
      });
      after(() => {
        Employee.findOne.restore();
      });
      it('should call Employee.findOne() and not throw', async () => {
        findOne.called.should.be.true;
        findOne.should.not.throw;
      });
      it('should call Model.SetUpHyperLinks() and not throw', () => {
        setUpHyperLinks.called.should.be.true;
        setUpHyperLinks.should.not.throw;
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
        await employeeController.GetEmployeeById(req, resStatus, (error) => { throw error; });
      });
      it('res.json() should return an object', () => {
        res.json.args[0][0].should.be.an('object');
      });
      it('returned object should have an _id property', () => {
        res.json.args[0][0].should.have.property('_id');
      });
      it('returned object._id and req.params.id should match', () => {
        res.json.args[0][0]._id.should.be.equal(req.params.id);
      })
    });
    describe('Successful Request Found No Employee', () => {
      let findOne;
      const SetUpHyperLinks = sinon.spy();
      const req = {
        params: {
          id: '424440',
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
        findOne = sinon.stub(Employee, 'findOne',).callsFake((condition) => {
          const db = [{
            _id: '424454',
            firstName: 'John',
            lastName: 'Smith',
            Phonenumber: '41415465',
            links: [],
            SetUpHyperLinks: SetUpHyperLinks,
          }];
          let returnVal;
          for (let i = 0; i < db.length; i++) {
            if (db[i]._id === condition._id) {
              returnVal = db[i];
            }
          }
          return returnVal;
        })
        await employeeController.GetEmployeeById(req, res, next);
      });
      after(() => {
        Employee.findOne.restore();
      });
      it('should call Employee.findOne() and not throw', () => {
        findOne.called.should.be.true;
        findOne.should.not.throw;
      });
      it('should not call model.SetUpHyperLinks()', () => {
        SetUpHyperLinks.called.should.be.false;
      });
      it
      it('should call res.json()', () => {
        res.json.called.should.be.true;
      });
      it('should call res.status() with statuscode 204', async () => {
        const resStatus = {
          json: sinon.spy(),
          status(statuscode) {
            statuscode.should.be.equal(204);
            return this;
          },
        };
        await employeeController.GetEmployeeById(req, resStatus, (error) => { throw error; });
      });
      it('res.json() should return an object', () => {
        res.json.args[0][0].should.be.an('object');
      });
      it('res.json() should return an empty object', () => {
        res.json.args[0][0].should.not.have.property('_id');
      });
    });
    describe('Unsuccessful Request, Error With Database', () => {
      let findOne;
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
        findOne = sinon.stub(Employee, 'findOne').throws();
        await employeeController.GetEmployeeById(req, res, next);
      });
      after(() => {
        Employee.findOne.restore();
      });
      it('should call Employee.findOne()', () => {
        findOne.called.should.be.true;
      });
      it('Employee.findOne() should throw', () => {
        findOne.should.throw;
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
    describe('Unsuccesful Request, Error with HATAEOS', () => {
      let findOne;
      const SetUpHyperLinks = sinon.stub().throws();
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
        findOne = sinon.stub(Employee, 'findOne',).callsFake((condition) => {
          const db = [{
            _id: '424454',
            firstName: 'John',
            lastName: 'Smith',
            Phonenumber: '41415465',
            links: [],
            SetUpHyperLinks: SetUpHyperLinks,
          }];
          let returnVal;
          for (let i = 0; i < db.length; i++) {
            if (db[i]._id === condition._id) {
              returnVal = db[i];
            }
          }
          return returnVal;
        })
        await employeeController.GetEmployeeById(req, res, next);
      });
      after(() => {
        Employee.findOne.restore();
      });
      it('should call Employee.findOne() and not throw', () => {
        findOne.called.should.be.true;
        findOne.should.not.throw;
      });
      it('should call Model.SetUpHyperLinks()', () => {
        SetUpHyperLinks.called.should.be.true
      })
      it('Model.SetUpHyperLinks() should throw', () => {
        SetUpHyperLinks.called.should.throw;
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
  describe('CreateEmployee', () => {
    describe('Sucessful Reqest, Created Employee', () => {
      let employeeCreate;
      let jobCreate;
      let walletCreate;
      let workhoursCreate;
      let userCreate;
      let setupHyperLinks = sinon.spy();
      const req = {
        params: {
          id: '424454',
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
        employeeCreate = sinon.stub(Employee, 'create').returns({
          firstName: 'John',
          lastName: 'Smith',
          Phonenumber: '41415465',
          links: [],
          SetUpHyperLinks: setupHyperLinks,
        });
        jobCreate = sinon.stub(Job, 'create').returns({});
        walletCreate = sinon.stub(Wallet, 'create').returns({});
        workhoursCreate = sinon.stub(Workhours, 'create').returns({});
        userCreate = sinon.stub(User, 'create').returns({});

        //  TODO: fix this test suite, it keeps throwing
        sinon.stub(mongoose.Types, 'ObjectId').returns(Math.floor((Math.random() * 100) + 1))
        await employeeController.CreateEmployee(req, res, next);
      });
      after(() => {
        Employee.create.restore();
        Job.create.restore();
        Wallet.create.restore();
        Workhours.create.restore();
        User.create.restore();
      });
      it('should call Employee.create() and not throw', () => {
        employeeCreate.called.should.be.true;
      });
      it('should call Model.SetUpHyperLinks', () => {
        setupHyperLinks.called.should.be.true;
      })
    });
  });
});
