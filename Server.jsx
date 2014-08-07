let then = Promise.prototype.then;
Promise.prototype.then = function() {
    if (!this._inited) {
        this._inited = true;
        this.catch((error) => {
            setTimeout(() => {throw error});
        });
    }
    return then.apply(this, arguments);
}



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
    return bodyParser.urlencoded({extended: true});
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

function loadModels(method, modelName, modelId, objectToSave, query, User) {
    return new Promise((resolve, reject) => {
        let Model = this.model(modelName);
        if (!Model) {
            return reject(new Error(404));
        }

        if (method === 'POST') {
            if (modelId) {
                return reject(new Error(403));
            }
            objectToSave[modelName] = new Model();
            if (!objectToSave[modelName].acl(method, User)) {
                objectToSave[modelName] = null;
                delete objectToSave[modelName];
                return reject(new Error(403));
            }
            return resolve();
        } else if (method === 'PUT' && !modelId) {
            return reject(new Error(403));
        }

        if (!modelId) {
            return Model.find(query).then((models) => {
                let preparedName = modelName;
                preparedName += 'Collection';
                objectToSave[preparedName] = models || [];
                return resolve();
            }).catch((error) => {
                return reject(error);
            });
        }

        return Model.findById(modelId, query).then((model) => {
            objectToSave[modelName] = model;
            if (!objectToSave[modelName].acl(method, User)) {
                objectToSave[modelName] = null;
                delete objectToSave[modelName];
                return reject(new Error(403));
            }
            return resolve();
        }).catch((error) => {
            return reject(error);
        });
    });
}

export default class Server {
    constructor() {
        mongoose.connect('mongodb://localhost/test');
        Object.keys(Models).forEach((name) => this.model(name, Models[name]));
    }

    isModelSuitable(Model) {
        return true;
    }

    getMongo() {
        return mongoose;
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

        Model.setServer(this);

        this._models[name] = Model;
        return Model;
    }

    _create(req, res) {
        let model = req.models[req.params.relModel || req.params.model];
        for (let key in req.body) {
            if (!req.body.hasOwnProperty(key)) {continue;}
            model.set(key, req.body[key]);
        }
        model.save().then(() => {
            res.send({
                models: req.models
            });
        }).catch((err) => res.send(500));
    }

    _read(req, res) {
        res.status(200).send({
            models: req.models
        });
    }

    _update(...args) {
        this._create(...args);
    }

    _delete(req, res) {
        let model = req.models[req.params.relModel || req.params.model];
        model.remove(() => res.status(200).send());
    }

    initDataEndpoints() {
        this.express().param('model', (req, res, next) => {
            if (!req.models) {
                req.models = {};
            }
            let User = null;
            loadModels.call(this, req.method, req.params.model, req.params.modelId, req.models, req.query, User)
            .then(() => next()).catch((error) => {
                console.log(error);
                res.status(404 || 403 || 500).end();
            });
        });
        this.express().param('relModel', (req, res, next) => {
            let User = null;
            loadModels.call(this, req.method, req.params.relModel, req.params.relModelId, req.models, req.query, User)
            .then(() => next()).catch((error) => {
                console.log(error);
                res.status(404 || 403 || 500).end();
            });
        });

        let route = this.route('/api/data/:model/:modelId?/:relModel?/:relModelId?');
        route.post((...args) => this._create(...args));
        route.get((...args) => this._read(...args));
        route.put((...args) => this._update(...args));
        route.delete((...args) => this._delete(...args));
        return this;
    }

    route(route) {
        return this.express().route(route);
    }

    use(middleware) {
        this.express().use(middleware);
        return this;
    }

    express() {
        if (!this._express) {
            this._express = express();
        }

        return this._express;
    }

    init() {
        defaultMiddlewares.forEach((middleware) => this.use(middleware()));
        this.initDataEndpoints();
        return this;
    }

    run() {
        this.init();
        this.express().listen(8080);
    }
}