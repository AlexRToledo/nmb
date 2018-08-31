const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    path = require('path'),
    helmet = require('helmet'),
    MongoStore = require('connect-mongo')(session);
    logger = require('morgan');

class Express {
    constructor(app) {
        this.app = app;
        this.initialize();
    }

    initialize() {
        this.app.set('views', path.join(__dirname, './../../views'));
        this.app.set('view engine', 'pug');
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));

        this.app.use(express.static(path.join(__dirname, './../../public')));

        this.app.use(session({
            key: 'www.smartico.com',
            name: 'jmjc-cookie',
            secret: 's0m3s3cr3tva4lu3g03sh3r3',
            cookie: {maxAge: 1000 * 60 * 60 * 12},
            resave: false,
            saveUninitialized: true,
            store: new MongoStore( {
                url: global.config.mongoUrl,
                autoRemove: 'native'
            })
        }));

        this.app.use(helmet());
    }
}

module.exports = Express;
