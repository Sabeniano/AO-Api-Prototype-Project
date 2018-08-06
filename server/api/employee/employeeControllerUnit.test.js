const chai = require('chai');

const should = chai.should();
const sinon = require('sinon');
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
        status: sinon.stub().callsFake(function (statuscode) {
          return this;
        }),
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
        res.status.called.should.be.true;
        res.status.args[0][0].should.be.equal(200)
      });
      it('res.json() should be called with an object', () => {
        res.json.args[0][0].should.be.an('object');
      });
      it('res.json() should be called with an object with the properties "count" and "employees"', () => {
        res.json.args[0][0].should.have.property('count');
        res.json.args[0][0].should.have.property('employees');
      });
      it('res.json() should be called with an object with a "count" of size 0 or more', () => {
        res.json.args[0][0].count.should.be.above(0);
      });
      it('res.json() should be called with an object with an array property of "employees"', () => {
        res.json.args[0][0].employees.should.be.an('array');
      });
      it('res.json() should be called with an object with an array property of "employees" with length bigger than 0', () => {
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
        status: sinon.stub().callsFake(function (statuscode) {
          return this;
        }),
      };
      const next = sinon.spy();
      before(async () => {
        find = sinon.stub(Employee, 'find').returns([]);
        await employeeController.GetAllEmployees(req, res, next);
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
      it('should call res.status() with statuscode 204', () => {
        res.status.called.should.be.true;
        res.status.args[0][0].should.be.equal(204)
      });
      it('res.json() should be called with an object', () => {
        res.json.args[0][0].should.be.an('object');
      });
      it('res.json() should be called with an object with the properties "count" and "employees"', () => {
        res.json.args[0][0].should.have.property('count');
        res.json.args[0][0].should.have.property('employees');
      });
      it('res.json() should be called with an object with a count property of size 0', () => {
        res.json.args[0][0].count.should.be.equal(0);
      });
      it('res.json() should be called with an object with an array property of "employees"', () => {
        res.json.args[0][0].employees.should.be.an('array');
      });
      it('res.json() should be called with an object with an array property of "employees" with length equal to 0', () => {
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
        status: sinon.stub().callsFake(function (statuscode) {
          return this;
        }),
      };
      const next = sinon.spy();
      before(async () => {
        findOne = sinon.stub(Employee, 'findOne', ).callsFake((condition) => {
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
      it('should call res.status() with statuscode 200', () => {
        res.status.called.should.be.true;
        res.status.args[0][0].should.be.equal(200);
      });
      it('res.json() should be called with an object', () => {
        res.json.args[0][0].should.be.an('object');
      });
      it('object should have an _id property', () => {
        res.json.args[0][0].should.have.property('_id');
      });
      it('object._id and req.params.id should match', () => {
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
        status: sinon.stub().callsFake(function (statuscode) {
          return this;
        }),
      };
      const next = sinon.spy();
      before(async () => {
        findOne = sinon.stub(Employee, 'findOne', ).callsFake((condition) => {
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
      it('should call res.status() with statuscode 204', () => {
       res.status.called.should.be.true;
       res.status.args[0][0].should.be.equal(204)
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
      };
      const next = sinon.spy();
      before(async () => {
        findOne = sinon.stub(Employee, 'findOne', ).callsFake((condition) => {
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
    describe('Successful Reqest, Created Employee', () => {
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
        body: {
          firstName: 'John',
          lastName: 'Smith'
        },
        originalUrl: 'TEST',
        headers: {
          host: 'TEST',
        },
      };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().callsFake(function (statuscode) {
          return this;
        }),
      };
      const next = sinon.spy();
      before(async () => {
        employeeCreate = sinon.stub(Employee, 'create').returns({
          _id: Math.floor((Math.random() * 100) + 1),
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
        employeeCreate.should.not.throw;
      });
      it('should call Model.SetUpHyperLinks and not throw', () => {
        setupHyperLinks.called.should.be.true;
        setupHyperLinks.should.not.throw;
      })
      it('should call Job.create() and not throw', () => {
        jobCreate.called.should.be.true;
        jobCreate.should.not.throw;
      });
      it('should call Wallet.create() and not throw', () => {
        walletCreate.called.should.be.true;
        walletCreate.should.not.throw;
      });
      it('should call Workhours.create() and not throw', () => {
        workhoursCreate.called.should.be.true;
        workhoursCreate.should.not.throw;
      });
      it('should call User.create() and not throw', () => {
        userCreate.called.should.be.true;
        userCreate.should.not.throw;
      });
      it('should call res.json()', () => {
        res.json.called.should.be.true;
      });
      it('should call res.status() with status code 201', () => {
        res.status.called.should.be.true;
        res.status.args[0][0].should.be.equal(201);
      });
      it('res.json() should be called with an object', () => {
        res.json.args[0][0].should.be.an('object');
      });
      it('object should have an _id property', () => {
        res.json.args[0][0].should.have.property('_id');
      });
      it('res.json() should be called with an object with an _id property of same value as the new created employee _id property', () => {
        let newCreatedEmployeeId = employeeCreate.returnValues[0]._id;
        res.json.args[0][0]._id.should.be.equal(newCreatedEmployeeId);
      });
    });
    describe('Unsuccessful Request, Error with Employee.create()', () => {
      let create;
      const req = {
        params: {
          id: '424454',
        },
        body: {
          firstName: 'John',
          lastName: 'Smith'
        },
        originalUrl: 'TEST',
        headers: {
          host: 'TEST',
        },
      };
      const res = {
        json: sinon.spy(),
      };
      let next = sinon.spy();
      before(async () => {
        create = sinon.stub(Employee, 'create').throws();
        await employeeController.CreateEmployee(req, res, next);
      });
      after(() => {
        Employee.create.restore();
      });
      it('should call Employee.create()', () => {
        create.called.should.be.true;
      });
      it('Employee.create() should throw', () => {
        create.should.throw;
      });
      it('should not call res.json()', () => {
        res.json.called.should.be.false;
      });
      it('should call next()', () => {
        next.called.should.be.true;
      });
      it('should call next() with an Error object', () => {
        next.args[0][0].should.be.an('Error');
      });
    });
    describe('Unsuccessful Request, Error with HATAEOS', () => {
      let employeeCreate;
      let setupHyperLinks = sinon.stub().throws();
      const req = {
        params: {
          id: '424454',
        },
        body: {
          firstName: 'John',
          lastName: 'Smith'
        },
        originalUrl: 'TEST',
        headers: {
          host: 'TEST',
        },
      };
      const res = {
        json: sinon.spy(),
      };
      let next = sinon.spy();
      before(async () => {
        employeeCreate = sinon.stub(Employee, 'create').returns({
          _id: Math.floor((Math.random() * 100) + 1),
          firstName: 'John',
          lastName: 'Smith',
          Phonenumber: '41415465',
          links: [],
          SetUpHyperLinks: setupHyperLinks,
        });
        employeeController.CreateEmployee(req, res, next);
      });
      after(() => {
        Employee.create.restore();
      });
      it('should call Employee.create() and not throw', () => {
        employeeCreate.called.should.be.true;
        employeeCreate.should.not.throw;
      });
      it('should call Model.SetUpHyperLinks()', () => {
        setupHyperLinks.called.should.be.true;
      });
      it('Model.SetUpHyperLinks() should throw', () => {
        setupHyperLinks.should.throw;
      });
      it('should not call res.json()', () => {
        res.json.called.should.be.false;
      });
      it('should call next()', () => {
        next.called.should.be.true;
      });
      it('should call next() with an Error object', () => {
        next.args[0][0].should.be.an('Error');
      });
    });
    describe('Unsuccessful Request, Error with job.create()', () => {
      let employeeCreate;
      let jobCreate;
      let setupHyperLinks = sinon.spy();
      const req = {
        params: {
          id: '424454',
        },
        body: {
          firstName: 'John',
          lastName: 'Smith'
        },
        originalUrl: 'TEST',
        headers: {
          host: 'TEST',
        },
      };
      const res = {
        json: sinon.spy(),
      };
      let next = sinon.spy();
      before(async () => {
        employeeCreate = sinon.stub(Employee, 'create').returns({
          _id: Math.floor((Math.random() * 100) + 1),
          firstName: 'John',
          lastName: 'Smith',
          Phonenumber: '41415465',
          links: [],
          SetUpHyperLinks: setupHyperLinks,
        });
        jobCreate = sinon.stub(Job, 'create').throws();
        employeeController.CreateEmployee(req, res, next);
      });
      after(() => {
        Employee.create.restore();
        Job.create.restore();
      });
      it('should call Employee.create() and not throw', () => {
        employeeCreate.called.should.be.true;
        employeeCreate.should.not.throw;
      });
      it('should call Model.SetUpHyperLinks() and not throw', () => {
        setupHyperLinks.called.should.be.true;
        setupHyperLinks.should.not.throw;
      });
      it('should call Job.create()', () => {
        jobCreate.called.should.be.true;
      });
      it('Job.create should throw', () => {
        jobCreate.should.throw;
      });
      it('should not call res.json()', () => {
        res.json.called.should.be.false;
      });
      it('should call next()', () => {
        next.called.should.be.true;
      });
      it('should call next() with an Error object', () => {
        next.args[0][0].should.be.an('Error');
      });
    });
    describe('Unsuccessful Request, Error with Wallet.create', () => {
      let employeeCreate;
      let jobCreate;
      let walletCreate;
      let setupHyperLinks = sinon.spy();
      const req = {
        params: {
          id: '424454',
        },
        body: {
          firstName: 'John',
          lastName: 'Smith'
        },
        originalUrl: 'TEST',
        headers: {
          host: 'TEST',
        },
      };
      const res = {
        json: sinon.spy(),
      };
      let next = sinon.spy();
      before(async () => {
        employeeCreate = sinon.stub(Employee, 'create').returns({
          _id: Math.floor((Math.random() * 100) + 1),
          firstName: 'John',
          lastName: 'Smith',
          Phonenumber: '41415465',
          links: [],
          SetUpHyperLinks: setupHyperLinks,
        });
        jobCreate = sinon.stub(Job, 'create').returns({});
        walletCreate = sinon.stub(Wallet, 'create').throws();
        employeeController.CreateEmployee(req, res, next);
      });
      after(() => {
        Employee.create.restore();
        Job.create.restore();
        Wallet.create.restore();
      });
      it('should call Employee.create and not throw', () => {
        employeeCreate.called.should.be.true;
        employeeCreate.should.not.throw;
      });
      it('should call Model.SetUpHyperLinks() and not throw', () => {
        setupHyperLinks.called.should.be.true;
        setupHyperLinks.should.not.throw;
      });
      it('should call Job.create() and not throw', () => {
        jobCreate.called.should.be.true;
        jobCreate.should.not.throw;
      });
      it('should call Wallet.create()', () => {
        walletCreate.called.should.be.true;
      });
      it('Wallet.create() should throw', () => {
        walletCreate.should.throw;
      });
      it('should not call res.json', () => {
        res.json.called.should.be.false;
      });
      it('should call next()', () => {
        next.called.should.be.true;
      });
      it('should call next() with an Error object', () => {
        next.args[0][0].should.be.an('Error');
      });
    });
    describe('Unsuccessful Request, Error with Workhours.create', () => {
      let employeeCreate;
      let jobCreate;
      let walletCreate;
      let workhoursCreate;
      let setupHyperLinks = sinon.spy();
      const req = {
        params: {
          id: '424454',
        },
        body: {
          firstName: 'John',
          lastName: 'Smith'
        },
        originalUrl: 'TEST',
        headers: {
          host: 'TEST',
        },
      };
      const res = {
        json: sinon.spy(),
      };
      let next = sinon.spy();
      before(async () => {
        employeeCreate = sinon.stub(Employee, 'create').returns({
          _id: Math.floor((Math.random() * 100) + 1),
          firstName: 'John',
          lastName: 'Smith',
          Phonenumber: '41415465',
          links: [],
          SetUpHyperLinks: setupHyperLinks,
        });
        jobCreate = sinon.stub(Job, 'create').returns({});
        walletCreate = sinon.stub(Wallet, 'create').returns({});
        workhoursCreate = sinon.stub(Workhours, 'create').throws();
        employeeController.CreateEmployee(req, res, next);
      });
      after(() => {
        Employee.create.restore();
        Job.create.restore();
        Wallet.create.restore();
        Workhours.create.restore();
      });
      it('should call Employee.create() and not throw', () => {
        employeeCreate.called.should.be.true;
        employeeCreate.should.not.throw;
      });
      it('should call Model.SetUpHyperLinks() and not throw', () => {
        setupHyperLinks.called.should.be.true;
        setupHyperLinks.should.not.throw;
      });
      it('should call Job.create() and not throw', () => {
        jobCreate.called.should.be.true;
        jobCreate.should.not.throw;
      });
      it('should call Wallet.create() and not throw', () => {
        walletCreate.called.should.be.true;
        walletCreate.should.not.throw;
      });
      it('should call Workhours.create()', () => {
        workhoursCreate.called.should.be.true;
      });
      it('Workhours.create() should throw', () => {
        workhoursCreate.should.throw;
      });
      it('should not call res.json', () => {
        res.json.called.should.be.false;
      });
      it('should call next()', () => {
        next.called.should.be.true;
      });
      it('should call next() with an Error object', () => {
        next.args[0][0].should.be.an('Error');
      });
    });
    describe('Unsuccessful Request, Error with User.creaet()', () => {
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
        body: {
          firstName: 'John',
          lastName: 'Smith'
        },
        originalUrl: 'TEST',
        headers: {
          host: 'TEST',
        },
      };
      const res = {
        json: sinon.spy(),
      };
      let next = sinon.spy();
      before(async () => {
        employeeCreate = sinon.stub(Employee, 'create').returns({
          _id: Math.floor((Math.random() * 100) + 1),
          firstName: 'John',
          lastName: 'Smith',
          Phonenumber: '41415465',
          links: [],
          SetUpHyperLinks: setupHyperLinks,
        });
        jobCreate = sinon.stub(Job, 'create').returns({});
        walletCreate = sinon.stub(Wallet, 'create').returns({});
        workhoursCreate = sinon.stub(Workhours, 'create').returns({});
        userCreate = sinon.stub(User, 'create').throws();
        employeeController.CreateEmployee(req, res, next);
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
        employeeCreate.should.not.throw;
      });
      it('should call Model.SetUpHyperLinks() and not throw', () => {
        setupHyperLinks.called.should.be.true;
        setupHyperLinks.should.not.throw;
      });
      it('should call Job.create() and not throw', () => {
        jobCreate.called.should.be.true;
        jobCreate.should.not.throw;
      });
      it('should call Wallet.create() and not throw', () => {
        walletCreate.called.should.be.true;
        walletCreate.should.not.throw;
      });
      it('should call Workhours.create() and not throw', () => {
        workhoursCreate.called.should.be.true;
        workhoursCreate.should.not.throw;
      });
      it('should call User.create()', () => {
        userCreate.called.should.be.true;
      });
      it('User.create() should throw', () => {
        userCreate.should.throw;
      });
      it('should not call res.json', () => {
        res.json.called.should.be.false;
      });
      it('should call next()', () => {
        next.called.should.be.true;
      });
      it('should call next() with an Error object', () => {
        next.args[0][0].should.be.an('Error');
      });
    });
  });
  describe('UpdateEmployee', () => {
    describe('Successful Request, Updated Employee with new lastChanged property in requestt', () => {
      let findOneAndUpdate;
      let setupHyperLinks = sinon.spy();
      const req = {
        params: {
          id: '424454',
        },
        body: {
          firstName: 'John',
          lastName: 'Smith',
          lastChanged: Date.now(),
        },
        originalUrl: 'TEST',
        headers: {
          host: 'TEST',
        },
      };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().callsFake(function (statuscode) {
          return this;
        }),
      };
      let next = sinon.spy();
      before(async () => {
        findOneAndUpdate = sinon.stub(Employee, 'findOneAndUpdate').callsFake((conditions, Update, options) => {
          const newObj = {};
          for (const key in Update.$set) {
            if (Update.$set.hasOwnProperty(key)) {
              newObj.key = Update.$set[key];
            }
          }
          newObj.SetUpHyperLinks = setupHyperLinks;
          if (options.new === true) {
            return newObj; 
          }
          return;
        });
        employeeController.UpdateEmployee(req, res, next);
      });
      after(() => {
        Employee.findOneAndUpdate.restore();
      });
      it('should call Employee.findOneAndUpdate() and not throw', () => {
        findOneAndUpdate.called.should.be.true;
        findOneAndUpdate.should.not.throw;
      });
      it('should call Model.SetUpHyperLinks() and not throw', () => {
        setupHyperLinks.called.should.be.true;
        setupHyperLinks.should.not.throw;
      });
      it('should call res.json()', () => {
        res.json.called.should.be.true;
      });
      it('should call res.status with a status code of 200', () => {
        let test = new Date().toLocaleString();
        console.log(test)
        res.status.args[0][0].should.be.equal(200);
      });
    });
  });
  describe('GetEmployeeById', () => {
    describe('Successful Request Found Employee', () => {
    });
  });
});
