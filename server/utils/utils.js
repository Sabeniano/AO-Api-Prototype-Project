module.exports = class Utils {
    /**
     * populates an objects field with selected fields
     * @param {object} mongooseObject the mongoose table to perform this on
     * @param {object} obj the object to populate
     * @param {string} path the field/path to populate
     * @param {string} select the fields of the populated object
     * @returns {Promise} returns a promise
     */
    static populate(mongooseObject, obj, path, select) {
        return new Promise((resolve, reject) => {
            if (typeof obj !== 'object') reject(new Error(`${typeof obj} is not an object`));

            if (Array.isArray(obj)) reject(new Error('Array is not an object'));

            if (typeof path !== 'string') reject(new Error(`${typeof path} is not a string`));

            if (typeof select !== 'string') reject(new Error(`${typeof select} is not a string`));

            resolve(mongooseObject.populate(obj, {path, select}));
        });
    }

    /**
     * capitalizes the first letter and minuscules the rest
     * @param {string} str string to capitalize first letter of
     * @returns {string} capitalized first letter string
     */
    static capitalizeFirstLetter(str) {
        return `${str.substring(0, 1).toUpperCase()}${str.substring(1, str.length).toLowerCase()}`;
    }

    /**
     * checks if an object has any keys
     * @param {object} object
     */
    static hasKeys(obj) {
        if(Object.keys(obj).length > 0) {
            return true;
        }
        return false;
    }

    /**
     * copy object with option to exclude keys
     * @param {object} objectToCopy object to be copied
     * @param {array} excludeProps array of keys to be excluded 
     */
    static cloneProperties(objectToCopy, excludeProps) {
        const args = excludeProps.split(' ');
        const keys = Object.keys(objectToCopy);
        const newObj = {};
        for (let i = 0; i < keys.length; i += 1) {
            if(!args.includes(keys[i])){
                newObj[keys[i]] = objectToCopy[keys[i]];
            }
        }
        return newObj;
    }

}