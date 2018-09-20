const Schedule = require('./scheduleModel');

module.exports = class ScheduleService {

    /**
     * finds all schedules belonging to an owner
     * @param {string} ownerId id of the owner
     * @returns {Promise} a promise that resolves to a schedule object
     */
    static findScheduleByOwnerId(ownerId) {
        return new Promise((resolve, reject) => {
            if (typeof ownerId !== 'string') reject(new Error(`${typeof ownerId} is not a string`));

            resolve(Schedule.findOne({ _Owner: ownerId }));
        });
    }

    /**
     * gets a schedule by a specific id
     * @param {String} id id of the schedule to find
     * @returns {Promise} a promise that resolves to a schedule object
     */
    static findScheduleById(id) {
        return new Promise((resolve, reject) => {
            if (typeof id !== 'string') reject(new Error(`${typeof id} is not a string`));

            resolve(Schedule.findOne({ _id: id }));
        });
    }

    /**
     * create a scedule
     * @param {Object} obj schedule to create
     * @returns {Promise} a promise that creates the schedule and returns the created schedule
     */
    static createSchedule(obj) {
        return new Promise((resolve, reject) => {
            if (Array.isArray(obj)) reject(new Error('array is not an object'));

            if (typeof obj !== 'object') reject(new Error(`${typeof obj} is not an object`));

            resolve(Schedule.create(obj));
        });
    }

    /**
     * creates a schedule model template with a set data
     * @param {Object} obj the data to create schedule with
     * @param {String} id id of the owner of the schedule
     */
    static createScheduleObject(obj, id) {
        if (typeof id !== 'string') throw new Error(`${typeof id} is not a string`);
    
        if (Array.isArray(obj)) throw new Error('array is not an object');
    
        if (typeof obj !== 'object') throw new Error(`${typeof obj} is not an object`);

        const createObj = {
            _Owner: id,
            workDate: obj.workDate,
            startHour: obj.startHour,
            endHour: obj.endHour,
            isHoliday: obj.isHoliday,
            isWeekend: obj.isWeekend,
        };

        return createObj;
    }

    /**
     * finds a schedule and updates it
     * @param {Object} obj object to update the schedule with
     * @param {String} id the id to find the schedule by
     * @returns {Promise} a promise that updates the schedule and returns the new updated user
     */
    static findAndUpdateScheduleById(obj, id) {
        return new Promise((resolve, reject) => {
            if (typeof id !== 'string') reject(new Error(`${typeof id} is not a string`));

            if (Array.isArray(obj)) reject(new Error('array is not an object'));
            
            if (typeof obj !== 'object') reject(new Error(`${typeof obj} is not an object`));

            resolve(Schedule.findOneAndUpdate({ _id: id}, { $set: obj }, { new: true }));
        });
    }

    /**
     * finds a schedule by id and deletes it
     * @param {String} id the id to find the schedule by
     * @returns {Promise} a promise that deletes the schedule and returns the deleted schedule
     */
    static findAndDeleteScheduleById(id) {
        return new Promise((resolve, reject) => {
            if (typeof id !== 'string') reject(new Error(`${typeof id} is not a string`));

            resolve(Schedule.findOneAndDelete({ _id: id }));
        });
    }

};