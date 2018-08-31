const express = require('express'),
    Express = require('./lib/Express'),
    Passport = require('./lib/Passport'),
    Router = require('./routes/Router'),
    Logger  = require('./lib/Logger'),
    Db = require('./lib/db/Db'),
    I18n = require('./lib/i18n'),
    app = express();

class App {
    constructor() {
        Db.Initialize().then(_ =>{
            new Express(app);
            new Passport(app);
            new Router(app);
            new I18n(app);

            Logger.Initialize(app);

            app.use(function (req, res, next) {
                res.render('error/404');
            });

            if (app.get('env') === 'development') {
                app.use(function (err, req, res, next) {
                    res.status(err.status || 500);
                    console.log(err.message);
                    res.render('error/500', {
                        message: err.message,
                        error: err,
                        title: 'Page 500'
                    });
                });
            }
        });
        return app;
    }
}

module.exports = App;





