
class Session {

    static async Auth(req, res, next){
        if (req.user) {
            return req.user ? next() : res.status(403).json({error: 'Requires login'});
        } else {
            return req.user ? next() : res.redirect('/user/login');
        }
    }

    static async NoAuth(req, res, next){
        return req.user ? res.redirect('/') : next();
    }

    static async HasPermissions(req, res, next) {
        let is_admin = req.user && req.user.permissions.isAdmin,
            is_user = req.user && req.user.permissions.isUser;

        let permission = is_admin || is_user || req.user;
        if ( !permission ) res.redirect('/user/login');
        else return next();
    }

    static async IsXhr(req, res, next){
        return req.xhr ? next() : res.status(403).json({error: 'Don\'t allowed'});
    }

    static async NoCache(req, res, next){
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", 0);
        return next();
    }
}

module.exports = Session;