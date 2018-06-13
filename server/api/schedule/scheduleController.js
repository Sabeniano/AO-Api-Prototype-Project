import employeeControllerDebug from 'debug';
import schedule from './scheduleModel';

const debug = employeeControllerDebug('app:employeeController');

const scheduleController = {
  FindResource: async (req, res) => {
    try {
      const foundSchedule = await schedule.find({ _Owner: req.params.id });
      res.json(foundSchedule);
    } catch (error) {
      debug(error);
      res.send('Error, could not find resource').status(204);
    }
  },

  UpdateResource: async (req, res) => {
    try {
      await schedule.findByIdAndUpdate(req.params.scheduleId, req.body);
      res.send('New data updated').status(201);
    } catch (error) {
      res.send('Error processing the request').send(409);
    }
  },
};

export default scheduleController;
