import employeeControllerDebug from 'debug';
import schedule from './scheduleModel';
import sendError from '../../utils/sendError';

const debug = employeeControllerDebug('app:scheduleController');

const scheduleController = {
  FindResource: async (req, res) => {
    try {
      const foundSchedule = await schedule.find({ employee_id: req.params.id });
      res.status(200).json(foundSchedule);
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },

  UpdateResource: async (req, res) => {
    try {
      const updatedSchedule = await schedule.findByIdAndUpdate(req.params.scheduleId, req.body, { new: true });
      res.status(200).json(updatedSchedule);
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },
};

export default scheduleController;
