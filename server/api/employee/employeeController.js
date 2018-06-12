import Employees from './employeeModel';


const employeeController = {
  getResource: async (req, res) => {
    try {
      const foundEmployees = await Employees.find(req.query);
      res.json(foundEmployees);
    } catch (error) {
      res.status(404).send('couldnt find any');
    }
  },
};

export default employeeController;
