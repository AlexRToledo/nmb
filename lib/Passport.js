global.passport = require('passport'),
global.LocalStrategy = require('passport-local').Strategy;
const UserRepository = require('../app/main/managers/UserRepository'),
      Repository = new UserRepository();

class Passport {
    constructor(app) {
        this.app = app;
        this.initialize();
    }

    initialize() {
        passport.use(new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password'
            },
            (username, password, done) => {
                Repository.Find({username: username})
                    .then(user => {
                        if (!user) {
                            return done(null, false, {message: 'Username or password incorrect.'});
                        } else {
                            user.validPassword(password, function (err, valid) {
                                if (err || !valid) {
                                    return done(null, false, {message: 'Username or password incorrect.'});
                                }

                                let dbUser = {
                                    id: user._id.toString(),
                                    username: user.username
                                };

                                return done(null, dbUser);
                            });
                        }
                    }).catch(err => {
                    return done(err, false, {message: 'Username or password incorrect.'});
                })
            }));

        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(function (id, done) {
            Repository.Find({_id: id}, null).then(user => {
                let dbUser = {
                    _id: user._id.toString(),
                    username: user.username,
                };
                done(null, dbUser);
            }).catch(err => done(err, null))
        });

        this.app.use(passport.initialize());
        this.app.use(passport.session());

        this.app.use(function (req, res, next) {
            if (req.user) {
                res.locals.user = req.user;
                next();
            } else {
                next();
            }
        });
    }
}

module.exports = Passport;