const userController = require('./userController');

module.exports = {
    'users.all': {
        GET: userController.getAllUsers
    },

    'users.view': {
        GET: userController.renderUserPage
    },


    'users.create': {
        POST: userController.createUser
    },


    'users.byId': {
        GET: userController.getUserById
    },


    'users.update': {
        PUT: userController.updateUser
    },


    'users.delete': {
        DELETE: userController.deleteUser
    }
};