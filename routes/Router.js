const MainController = require('../app/main/controllers/MainController');
const UserController = require('../app/main/controllers/UserController');

class Router {
    constructor(app) {
        new MainController(app).Router('/');
        new UserController(app).Router('/user');
    }
}

module.exports = Router;
