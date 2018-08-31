const MainController = require('./main/controllers/MainController');
const UserController = require('./main/controllers/UserController');

class Router {
    constructor(app) {
        new MainController(app).Router('/');
        new UserController(app).Router('/user');
    }
}

module.exports = Router;
