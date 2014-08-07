import Models from './Models.jsx';

let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cookie = require('cookie-parser');
let methodOverride = require('method-override');
let session = require('express-session');
let flash = require('connect-flash');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let bcrypt   = require('bcrypt-nodejs');

let defaultMiddlewares = [() => {
    return bodyParser.urlencoded();
}, () => {
    return cookie('some secret secret');
}, () => {
    return session({
        cookie: {
            maxAge: 12312313123212
        },
        secret: 'adsdasdsad',
        saveUninitialized: true,
        resave: true
    });
}, () => {
    return flash();
}];

class Server {
    constructor() {
        mongoose.connect('mongodb://localhost/test');
        Object.keys(Models).forEach((name) => this.model(name, Models[name]));
    }

    isModelSuitable(Model) {
        return true;
    }

    model(name, Model) {
        if (!this._models) {
            this._models = {};
        }
        if (!Model) {
            if (!this._models[name]) {
                throw new Error(`There is no model with name ${name}`);
            }
            return this._models[name];
        }

        if (!this.isModelSuitable(Model)) {
            throw new Error(`Model ${name} is not suitable for shop application`);
        }

        this._models[name] = Model;
        return Model;
    }

    _create(req, res) {
        let model = req.models[req.params.relModel || req.params.model];
        for (let key in req.body) {
            if (!req.body.hasOwnProperty(key)) {continue;}

            model[key] = req.body[key];
        }
        model.save(() => {
            res.send({
                models: req.models
            });
        });
    }

    _read(req, res) {
        res.status(200).send({
            models: req.models
        });
    }

    _update(args) {
        this._create(...args);
    }

    _delete(req, res) {
        let model = req.models[req.params.relModel || req.params.model];
        model.remove(() => res.status(200).send());
    }

    initDataEndpoints() {
        let route = this.route('/api/data/:model/:modelId?/:relModel?/:relModelId?');
        route.param('model', () => {
            if (!req.models) {
                req.models = {};
            }
            let User = null;
            loadModels(req.method, req.params.model, req.params.modelId, req.models, req.query, User)
            .then(() => next()).catch((error) => {
                console.log(error);
                res.status(404 || 403 || 500).end();
            });
        });
        route.param('relModel', () => {
            loadModels(req.method, req.params.relModel, req.params.relModelId, req.models, req.query)
            .then(() => next()).catch((error) => {
                console.log(error);
                res.status(404 || 403 || 500).end();
            });
        });
        route.post(() => this._create());
        route.get(() => this._read());
        route.put(() => this._update());
        route.delete(() => this._delete());
        return this;
    }

    route(route) {
        return this.express().route(route);
    }

    use(middleware) {
        app.use(middleware);
        return this;
    }

    express() {
        if (!this._express) {
            this._express = express();
        }

        return this._express;
    }

    init() {
        defaultMiddlewares.map((middleware) => this.use(middleware));
        this.initDataEndpoints();
        return this;
    }

    run() {
        this.init();
        this.express().listen(8080);
    }
}