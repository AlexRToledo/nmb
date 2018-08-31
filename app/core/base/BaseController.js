const BaseCrudRepository = require('./BaseCrudRepository');

const view = 'home';

class BaseController {

    constructor($app) {
        this.app = $app;
    }

    Router(path) {
        this.app.get(`${path}/`, this.Index);
        this.app.get(`${path}/index`, this.Index);
    }

    async Index(req, res, next) {
        res.render(`${view}/index`);
    }
}
module.exports = BaseController;
