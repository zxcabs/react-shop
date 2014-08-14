let then = Promise.prototype.then;
Promise.prototype.then = function() {
    if (!this._inited) {
        this._inited = true;
        this.catch((error) => {
            console.log(error);
        });
    }
    return then.apply(this, arguments);
}

import DataEndPoint from './DataEndPoint.jsx';
import AdminBackend from './admin/AdminBackend.jsx';
import Models from './Models.jsx';
import Schema from './Model/Schema.jsx';
import BaseModel from './Model/BaseModel.jsx';

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

let defaultMiddlewares = [
    bodyParser.urlencoded({extended: true}),
    methodOverride(function(req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            let method = req.body._method;
            delete req.body._method;
            return method;
        }
    }),
    cookie('some secret secret'),
    session({
        cookie: {
            maxAge: 12312313123212
        },
        secret: 'adsdasdsad',
        saveUninitialized: true,
        resave: true
    }),
    flash(),
    function(req, res, next) {
        req.user = null;
        next();
    }
];

class Server {
    constructor() {
        mongoose.connect('mongodb://localhost/test');
        Schema.server = this;
        BaseModel.server = this;
    }

    loadModel(method, modelName, modelId, objectToSave, query, User) {
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

            return Model.findById(modelId, query || {}).then((model) => {
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

        Model.init();

        this._models[name] = Model;
        return Model;
    }

    mount(route, Class) {
        let router = express.Router(route);
        this.defaultMiddlewares(router);
        new Class(router, this);
        this.use(route, router);
        return this;
    }

    mountDataEndPoints() {
        this.mount('/api/data', DataEndPoint);
        return this;
    }

    mountAdmin() {
        this.mount('/admin', AdminBackend);
        return this;
    }

    route(route) {
        return this.express().route(route);
    }

    use(url, middleware) {
        if (!middleware) {
            middleware = url;
            url = '*';
        }
        this.express().use(url, middleware);
        return this;
    }

    express() {
        if (!this._express) {
            this._express = express();
        }

        return this._express;
    }

    defaultMiddlewares(router) {
        defaultMiddlewares.forEach((middleware) => router.use(middleware));
        return router;
    }

    init() {
        if (!this._inited) {
            this._inited = true;
            Object.keys(Models).forEach((name) => this.model(name, Models[name]));
            this.defaultMiddlewares(this);
            this.mountDataEndPoints();
            this.mountAdmin();
            this.express().use(express.static('./dist'));
        }
        return this;
    }

    run() {
        this.init().express().listen(8080);
        if (process.send) {
            process.send('server started');
        }
    }
}

export default Server;