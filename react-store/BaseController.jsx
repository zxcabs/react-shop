import Models from './Models.jsx';

let React = require('react/addons');
if (typeof window !== 'undefined') {
    //for React Chrome dev tools plugin
    window.React = React;
}

let parserFunc = require('path-to-regexp');

class BaseController {
    constructor(req = null, res = null) {
        this._models = {};
        this.mountRoutes();
        if (req && res) {
            this.serverRoute(req, res);
        } else {
            this.initClient();
        }
    }

    mountRoutes() {
        return this;
    }

    initClient() {
        let initialJSON = document.querySelector('#initialData').value;
        this._models = JSON.parse(initialJSON) || {};
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
        document.body.addEventListener('click', (event) => {
            if (!event.target.href) {
                return;
            }
            if (event.altKey || event.ctrlKey || event.metaKey) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            this.routeChange(event.target.href);
            console.log('implement foreign url check');
        }, false);
        window.addEventListener('popstate', (event) => {
            this.run();
        }, false);
    }

    serverRoute(req, res) {
        this.request = req;
        this.response = res;
    }

    catchError(error) {
        console.log(error, error.stack);
        if (this.response) {
            this.response.status(500).send();
        }
    }

    route(route, callback) {
        if (!this._routes) {
            this._routes = [];
        }

        let keys = [];
        let parser = parserFunc(route, keys);
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
        };

        this._routes.push({
            parse,
            callback
        });
    }

    getLayoutModels() {
        return Promise.resolve();
    }

    checkRoute(route) {
        for (let routeChecker of this._routes) {
            let params = routeChecker.parse(route);
            if (!params) {continue;}
            this.params = params;
            if (!this._prevParams) {
                this._prevParams = this.params;
            }
            return routeChecker.callback.call(this);
        }
        console.log('implement 404 page');
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
        return this.request ? this.request.user : this._models.User;
    }

    routeChange(route) {
        window.history.pushState('', '', route);
        this.run();
    }

    getLayout(Page) {
        return Page({
            models: this._models,
            params: this.params,
            query: this.query
        });
    }

    renderToString(Page) {
        return '<!DOCTYPE html>' + React.renderComponentToString(this.getLayout(Page));
    }

    renderToDOM(Page) {
        return React.renderComponent(this.getLayout(Page), document);
    }

    render(Page) {
        if (typeof window === 'undefined') {
            let res = this.renderToString(Page);
            return this.response.status(200).send(res);
        }

        return this.renderToDOM(Page);
    }

    getCurrentPath() {
        if (this.request) {
            return this.request.path;
        }
        if (typeof window !== 'undefined') {
            let index = 0;
            console.log('implement url prefix');
            if (window.location.pathname.indexOf('/admin') !== -1) {
                index = window.location.pathname.indexOf('/', 1);
            }
            return window.location.pathname.slice(index);
        }
        throw new Error("WTF");
    }

    run() {
        this.query = {};//this.request ? this.request.query : window.location.search;
        console.log('implement query parse');
        this.checkRoute(this.getCurrentPath());
    }
}

export default BaseController;