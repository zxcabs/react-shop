var React = require('react/addons');
if (typeof window !== 'undefined') {
    window.React = React;
}

import Models from '../Models.jsx';
import AdminPage from './AdminPage.jsx';

let keys = [];
let parser = require('path-to-regexp')('/:dashboard/:id?/:tab?', keys);

let parse = (path) => {
    let res = parser.exec(path);
    if (!res) {
        return null;
    }
    return res.slice(1).reduce((accum, item, index) => {
        if (item !== null && item !== undefined) {
            accum[keys[index].name] = item;
        }
        return accum;
    }, {});
}

class AdminFrontend {
    constructor(req = null, res = null) {
        this._models = {};
        if (req && res) {
            this.serverRoute(req, res);
        } else {
            this.initClient();
        }
    }

    initClient() {
        let initialJSON = document.querySelector('#initialData').value;
        this._models = JSON.parse(initialJSON);
        for (let key in this._models) {
            if (!this._models.hasOwnProperty(key)) {continue;}
            let modelName = key;
            if (Array.isArray(this._models[key])) {
                modelName = key.slice(0, key.lastIndexOf('Collection'));
                this._models[key] = this._models[key].map((obj) => {
                    let model = new Models[modelName](obj);
                    model.notNew();
                    return model;
                });
            } else {
                this._models[key] = new Models[modelName](this._models[key]);
                this._models[key].notNew();
            }
        }
        window.addEventListener('popstate', (event) => {
            this.run();
        }, false);
    }

    serverRoute(req, res) {
        this.request = req;
        this.response = res;
    }

    loadModel(modelName, id = null, params = {}) {
        if (id) {
            if (this._models[modelName] && this._models[modelName].get('_id') === id) {
                return Promise.resolve(this._models);
            }
        } else {
            if (this._models[modelName + 'Collection']) {
                return Promise.resolve(this._models);
            }
        }
        return new Promise((resolve, reject) => {
            let Model = Models[modelName];
            if (!id) {
                return Model.find(params).then((Models) => {
                    this._models[modelName + 'Collection'] = Models;
                    resolve(this._models);
                }).catch((error) => reject(error))
            }
            if (id === 'new') {
                this._models[modelName] = new Model();
                return resolve(this._models);
            }
            return Model.findById(id, params).then((Model) => {
                this._models[modelName] = Model;
                resolve(this._models);
            }).catch((error) => reject(error));
        });
    }

    get user() {
        return this._req ? this._req.user : this._models.User;
    }

    toString() {
        return this.renderToString();
    }

    routeChange(route) {
        window.history.pushState('', '', route);
        this.run();
    }

    getView() {
        return AdminPage({
            models: this._models,
            routeChange: this.routeChange.bind(this),
            params: this.params
        });
    }

    renderToString() {
        return '<!DOCTYPE html>' + React.renderComponentToString(this.getView());
    }

    init() {
        return new Promise((resolve, reject) => {
            let promises = [];
            promises.push(this.loadModel(this.params.dashboard, null, this.query));
            if (this.params.id) {
                promises.push(this.loadModel(this.params.dashboard, this.params.id, this.query));
            }
            Promise.all(promises).then(() => {
                if (promises.length > 1) {
                    let Model = this._models[this.params.dashboard];
                    let id = Model.get('_id');
                    let Models = this._models[this.params.dashboard + 'Collection'];
                    for (let index = 0; index < Models.length; index++) {
                        if (Models[index].get('_id').toString() !== id.toString()) {
                            continue;
                        }
                        Models.splice(index, 1, Model);
                        break;
                    }
                }
                resolve(200);
            }).catch((error) => {
                this._models = {};
                reject(error);
            });
        });
    }

    getCurrentPath() {
        if (this.request) {
            return this.request.path;
        }
        if (typeof window !== 'undefined') {
            let index = window.location.pathname.indexOf('/', 1);
            return window.location.pathname.slice(index);
        }
        return new Error("WTF");
    }

    run() {
        let path = this.getCurrentPath();
        this.params = parse(path);
        if (!this.params) {
            let error = new Error(404);
            if (this.response) {
                return res.status(404).send(error);
            }
            return this.renderToErrorDOM(error);
        }
        this.query = this.request ? this.request.query : window.location.search;
        this.init().then((code) => {
            if (this.response) {
                return this.response.status(code).send(this.toString());
            }
            this.renderToDOM();
        }).catch((error) => {
            if (this.response) {
                return res.status(500).send(error);
            }
            this.renderToErrorDOM(error);
        });
    }

    renderToDOM() {
        React.renderComponent(this.getView(), document);
    }

    renderToErrorDOM(error) {
        console.log('implement error page');
        console.error(error.stack);
    }
}

if (typeof window !== 'undefined') {
    new AdminFrontend().run();
}

export default AdminFrontend;