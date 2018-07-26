const Workhour = require('./workhoursModel');
 
const workhoursController = {
  FindWorkhourById: async (req, res, next) => {
    try {
      const foundWorkhour = await Workhour.findOne({ employee_id: req.params.id });
      foundWorkhour.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(foundWorkhour);
    } catch (error) {
      next(error);
    }
  },

  UpdateWorkhour: async (req, res, next) => {
    try {
      const updatedWorkhour = await Workhour.findOneAndUpdate({ employee_id: req.params.id }, { $set: req.body }, { new: true });
      updatedWorkhour.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(updatedWorkhour);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = workhoursController;
