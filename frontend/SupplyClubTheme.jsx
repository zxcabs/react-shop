import MainPage from './MainPage.jsx';
import Models from '../Models.jsx';
let React = require('react/addons');

export default class SupplyClubTheme {
    constructor(opt) {
        this._models = {};
        this.user = opt.user;
        this.query = opt.query || {};
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
        return '<!DOCTYPE html>' + React.renderComponentToString(MainPage({
            models: this._models,
            query: this.query
        }));
    }

    init() {
        return new Promise((resolve, reject) => {
            let promises = [];
            promises.push(this.loadModel('Category', null, this.query));
            promises.push(this.loadModel('Product', null, this.query));
            Promise.all(promises).then(() => {
                resolve(200);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}