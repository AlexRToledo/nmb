const BaseController = require('../../core/base/BaseController');
// const _18n = require('i18n');

class MainController extends BaseController {

    constructor(app) {
        super(app);
    }

    Router(path) {
        super.Router(path);
        this.app.post(`${path}contact`, this.Contact);
        this.app.get(`${path}register`, this.Register);
        this.app.get(`${path}surveillance`, this.Surveillance);
        this.app.get(`${path}wireless`, this.Wireless);
        this.app.get(`${path}alarms`, this.Alarms);
        this.app.get(`${path}access`, this.Access);
        this.app.get(`${path}products`, this.Products);
        // Temporaly disabled translations
        // this.app.get(`${path}language/:lang`, this.Lang);
    }

    async Index(req, res, next) {
        res.render('home/index');
    }

    async Register(req, res, next) {
        res.render('home/register');
    }

    async Contact(req, res) {
        try {
            let data = {
                email: req.body.contact_email,
                message: req.body.contact_message1
            };
            await Manager.Create(data);
            let response = await Mail.ContactUs(data);
            res.redirect('/');
        } catch (e) {
            res.redirect('/');
        }
    }

    async Lang(req, res, next) {
        try {
            let lang = req.params.lang;
            _18n.setLocale(lang);
            res.redirect('/');
        } catch (e) {
            res.redirect('/');
        }

    }

    async Alarms(req, res, next) {
        res.render('pages/alarms');
    }

    async Surveillance(req, res) {
        res.render('pages/surveillance');
    }

    async Wireless(req, res) {
        res.render('pages/wireless');
    }

    async Access(req, res, next) {
        res.render('pages/access');
    }

    async Products(req, res, next) {
        res.render('pages/product');
    }

}

module.exports = MainController;