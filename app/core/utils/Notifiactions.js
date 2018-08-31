class Notifications {
    constructor() {}

    Message(req, flash) {
        if (req.session && req.session.flash && req.session.flash.type && req.session.flash.msg) {
            flash = {
                type: req.session.flash.type,
                msg: req.session.flash.msg,
            };
            req.session.flash = {};
            return flash;
        } else {
            return {}
        }
    }
}

module.exports = Notifications;