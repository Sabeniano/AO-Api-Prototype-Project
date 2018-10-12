const { cloneProperties, hasKeys } = require('../../utils/utils');
const {
  findAllUsers,
  findUserById,
  createUser,
  createUserObject,
  updateUserById,
  deleteUserById,
  populate,
} = require('./userService');

module.exports = class UserController {

  static async getAllUsers(obj, host, url) {
    const isQueryString = hasKeys(obj);
    const foundUsers = await findAllUsers(obj);
    if (foundUsers.length > 0) {
      for (let i = 0; i < foundUsers.length; i += 1) {
        foundUsers[i].setupHyperLinks(host, url, { queryString: isQueryString });
      }
      return {
        result: {
          count: foundUsers.length,
          users: foundUsers,
        },
      };
    }
    return {
      status: 204,
      result: null,
    };
  }

  static async getOneUser(id, host, url) {
    const foundUser = await findUserById(id);
    if (foundUser) {
      await populate(foundUser, 'employee', 'firstName lastName email phoneNumber links');
      foundUser.setupHyperLinks(host, url);
      foundUser.employee.setupHyperLinks(host, '/api/v1/employees');
      return {
        result: foundUser,
      };
    }
    return {
      status: 204,
      result: null,
    };
  } 

  static async createOneUser(obj, host, url) {
    const userObj = createUserObject(obj);
    const createdUser = await createUser(userObj);
    createdUser.setupHyperLinks(host, url);
    return {
      status: 201,
      result: createdUser.removePassword(),
    };
  }

  static async updateOneUser(obj, id, host, url) {
    const newObj = cloneProperties(obj, '_id employee');
    const updatedUser = await updateUserById(newObj, id);
    updatedUser.setupHyperLinks(host, url);
    return {
      result: updatedUser,
    };
  }

  static async deleteOneUser(id) {
    await deleteUserById(id);
    return {
      status: 200,
      message: 'Successfully deleted user',
    };
  }
};