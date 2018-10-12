const Job = require('./jobModel');

module.exports = class JobService {

    static findJobByOwner(ownerId) {
        return new Promise((resolve, reject) => {
            if (typeof ownerId !== 'string') reject(new Error(`${typeof ownerId} is not a string`));

            resolve(Job.findOne({ _Owner: ownerId }));
        });
    }

    static findJobByOwnerAndUpdate(ownerId, obj) {
        return new Promise((resolve, reject) => {
            if (typeof ownerId !== 'string') reject(new Error(`${typeof ownerId} is not a string`));

            if (Array.isArray(obj)) reject(new Error('array is not an object'));

            if (typeof obj !== 'object') reject(new Error(`${typeof obj} is not an object`));

            resolve(Job.findOneAndUpdate({ _Owner: ownerId }, { $set: obj }, { new: true }));
        });
    }
};