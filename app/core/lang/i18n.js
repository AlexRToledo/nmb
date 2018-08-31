const i18n = require("i18n");

class I18n {
    constructor(app) {
        this.app = app;
        this.Initialize();
    }

    Initialize() {
        i18n.configure(
            {
                locales:['en', 'es'],
                cookie: 'iseeit_cookie',
                register: global,
                directory: './locales',
                defaultLocale: 'en'
            }
        );

        this.app.use(i18n.init);
        this.app.use(function(req, res, next) {
            res.locals.__ = res.__ = function() {
                return i18n.__.apply(req, arguments);
            };

            if (req.user){
                req.setLocale(req.user.language ? req.user.language : 'en');
            }

            next();
        });
    }
}

module.exports = I18n;