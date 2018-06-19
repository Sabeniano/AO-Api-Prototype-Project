import employeeControllerDebug from 'debug';
import workhours from './workhoursModel';
import sendError from '../../utils/sendError';

const debug = employeeControllerDebug('app:workhoursController');

const workhoursController = {
  FindResource: async (req, res) => {
    try {
      const foundWorkhours = await workhours.find({ employees_id: req.params.id });
      res.status(200).json(foundWorkhours);
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },

  UpdateResource: async (req, res) => {
    try {
      const updatedWorkhours = await workhours.findByIdAndUpdate(req.params.workhoursId, req.body);
      res.status(200).json(updatedWorkhours);
    } catch (error) {
      sendError(500, 'Error processing the request', error);
    }
  },
};

export default workhoursController;
