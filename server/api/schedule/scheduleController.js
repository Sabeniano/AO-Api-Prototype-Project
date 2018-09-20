const {
  findScheduleByOwnerId,
  findSheduleById,
  createSchedule,
  createScheduleObject,
  findAndUpdateScheduleById,
  findAndDeleteScheduleById,
} = require('./scheduleService');
const { cloneProperties } = require('../../utils/utils');

module.exports = class ScheduleController {

  /**
   * gets all schedules belonging to the employee
   * @param {String} ownerId id of the schedule owner
   * @param {String} host the hostname portion of the requested url
   * @param {String} url the requested url after the hostname
   * @returns {Promise} a promise
   */
  static async getAllSchedules(ownerId, host, url) {
    const schedules = await findScheduleByOwnerId(ownerId)
    if (schedules.length > 0) {
      for (let i = 0; i < schedules.length; i += 1); {
        schedules[i].setupHyperLinks(host, url);
      }
      return {
        result: {
          count: schedules.length,
          schedules,
        },
      };
    }
    return {
      status: 204,
      result: null,
    };
  }

  /**
   * gets a schedule by id and returns it
   * @param {String} id id of the schedule to get
   * @param {String} host the hostname portion of the requested url
   * @param {String} url the requested url after the hostname
   * @returns {Promise} a promise
   */
  static async getScheduleById(id, host, url) {
    const foundSchedule = await findSheduleById(id);
    if (foundSchedule) {
      foundSchedule.setupHyperLinks(host, url);
      return {
        result: foundSchedule,
      };
    }
    return {
      status: 204,
      result: null,
    };
  }

  /**
   * creates a new schedule and returns it
   * @param {Object} obj the schedule to be create
   * @param {String} ownerId id of the owner of the schedule
   * @param {String} host the hostname part of the requeste url
   * @param {String} url the requested url after the hostname
   * @returns {Promise} a promise that resolves to an object
   */
  static async createSchedule(obj, ownerId, host, url) {
    const newSchedule = createScheduleObject(obj, ownerId);
    const createSchedule = await createSchedule(newSchedule);
    createSchedule.setupHyperLinks(host, url);
    return {
      status: 201,
      result: createSchedule,
    };
  }

  /**
   * updates a schedule and returns the updated schedule
   * @param {Object} obj the object to update the schedule with
   * @param {String} id id of the schedule to update
   * @param {String} host the hostname part of the requeste url
   * @param {String} url the requested url after the hostname
   * @returns {Promise} a promise that resolves to an object
   */
  static async updateScheduleById(obj, id, host, url) {
    const updated = cloneProperties(obj, '_id _Owner');
    const updatedSchedule = await findAndUpdateScheduleById(updated, id);
    updatedSchedule.setupHyperLinks(host, url);
    return {
      result: updatedSchedule,
    };
  }

  /**
   * deletes a schedule with the given id
   * @param {String} id id of the schedule to delete
   */
  static async deleteScheduleById(id) {
    await findAndDeleteScheduleById(id);
    return {
      result: 'successfully deleted schedule'
    }
  }
}