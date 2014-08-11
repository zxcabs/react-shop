import Models from '../Models.jsx';
import AdminPage from './AdminPage.jsx';
let React = require('react/addons');

export default class AdminFrontend {
    constructor(opt) {
        this._models = {};
        this.user = opt.user;
        this.query = opt.query || {};
        this.params = opt.params;
    }

    loadModel(modelName, id = null, params = {}) {
        return new Promise((resolve, reject) => {
            let Model = Models[modelName];
            params.refs = 'parent';
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

    toString() {
        return this.renderToString();
    }

    renderToString() {
        return '<!DOCTYPE html>' + React.renderComponentToString(AdminPage({
            models: this._models,
            params: this.params
        }));
    }

    init() {
        return new Promise((resolve, reject) => {
            let promises = [this.loadModel(this.params.dashboard, null, this.query)];
            if (this.params.id) {
                promises.push(this.loadModel(this.params.dashboard, this.params.id, this.query));
            }
            Promise.all(promises).then(() => {
                resolve(200);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}