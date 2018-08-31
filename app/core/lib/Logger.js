const fs = require('fs-extra'),
    path = require('path'),
    _ = require('lodash'),
    winston = require('winston'),
    morgan = require('morgan');

class Logger {

    static Initialize(app) {
        let filename = path.join('./logs/logs.log');
        let accessLogStream = fs.createWriteStream('./logs/access.log', {flags: 'a'});
        app.use(morgan('combined', {stream: accessLogStream}));

        let customColors = {
            trace: 'white',
            debug: 'green',
            info: 'green',
            warn: 'yellow',
            crit: 'red',
            fatal: 'red'
        };

        let logger = new(winston.Logger)({
            colors: customColors,
            levels: {
                trace: 0,
                debug: 1,
                info: 2,
                warn: 3,
                crit: 4,
                fatal: 5
            },
            transports: [
                new(winston.transports.Console)({
                    level: app.settings.logLevel,
                    colorize: true,
                    timestamp: true
                }),
                new (winston.transports.File)({
                    filename: filename,
                    handleExceptions: true,
                    humanReadableUnhandledException: true
                })
            ]
        });

        winston.addColors(customColors);

        let origLog = logger.log;

        logger.log = function (level, msg) {
            if (msg instanceof Error) {
                let args = Array.prototype.slice.call(arguments);
                args[1] = msg.stack;
                origLog.apply(logger, args);
            } else {
                origLog.apply(logger, arguments);
            }
        };

        global.logger = logger;
    }
}

module.exports = Logger;