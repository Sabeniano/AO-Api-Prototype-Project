const User = require('./userModel')
const { capitalizeFirstLetter, populate } = require('../../utils/utils')

module.exports = class UserService {
    
    static findAllUsers(conditions) {
        return new Promise((resolve, reject) => {
            if (Array.isArray(conditions)) reject(new Error('array is not an object'))

            if (typeof conditions !== 'object') reject(new Error(`${typeof conditions} is not an object`));

            resolve(User.find(conditions, 'username email links employee'));
        });
    } 
    
    static findUserById(id) {
        return new Promise((resolve, reject) => {
            if (typeof id !== 'string') reject(new Error(`${typeof id} is not a string`));

            resolve(User.findOne({ _id: id }, 'username email links role employee'));
        });
    }

    static createUser(obj) {
        return new Promise((resolve, reject) => {
            if (Array.isArray(obj)) reject(new Error('array is not an object'));
            
            if (typeof obj !== 'object') reject(new Error(`${typeof obj} is not an object`));
            
            resolve(User.create(obj));
        })
    }

    static deleteUserById(id) {
        return new Promise((resolve, reject) => {
            if (typeof id !== 'string') reject(new Error(`${typeof id} is not a string`));

            resolve(User.findOneAndRemove({ _id : id }));
        });
    }

    static populate(obj, path, select) {
        return populate(User, obj, path, select);
    }

    static createUserObject(obj) {
        return {
            username: obj.username,
            email: obj.email,
            role: capitalizeFirstLetter(obj.role),
            password: obj.password,
        };
    }
};