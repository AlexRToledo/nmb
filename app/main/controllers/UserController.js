const Session = require('../../core/lib/Session'),
      BaseController = require('./MainController'),
      UserRepository = require('../managers/UserRepository');

const Repository = new UserRepository();

class UserController extends BaseController {
    constructor(app) {
        super(app);
    }

    Router(path){
        this.app.get(`${path}/login`,               Session.NoAuth,                                                     this.loginPage);
        this.app.get(`${path}/create`,                                                                                  this.createUser);
        this.app.post(`${path}/create`,                                                                                 this.createUserAction);
        this.app.get(`${path}/info`,                Session.Auth,                                                       this.userInfo);
        this.app.get(`${path}/logout`,              Session.Auth,                                                       this.logout);
        this.app.get(`/dashboard`,                  Session.Auth,                                                       this.Index);
    }

    async Index(req, res, next) {
        res.render('dashboard/index');
    }

    async login(req, res) {
        if(req.user) {
            res.redirect('/dashboard');
        } else {
            res.redirect('/user/login');
        }
    }

    async loginPage(req, res, next) {
        if(req.user) {
            res.redirect('/dashboard')
        } else {
            res.render('home/login', {message: req.flash('error')});
        }
    }

    async logout(req, res, next) {
        req.logout();
        res.redirect('/');
    }

    async userInfo(req, res) {
        try{
            let user = await Repository.Find({_id:req.user._id}, null);
            res.render('user', {username: user.username});

        }catch (e) {
            res.render('pages/500', {error: err});
        }
    }

    async createUser(req, res) {
        res.render('user/create')
    }

    async createUserAction(req, res) {
        try {
            let user = await Repository.Create(req.body.username, req.body.password);
            res.redirect('/');
        }catch (e) {
            res.render('pages/500', {error: 'Error creating user, please try again later.'});
        }
    }
}

module.exports = UserController;
