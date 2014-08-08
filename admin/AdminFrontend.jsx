import Models from '../Models.jsx';
import AdminPage from './AdminPage.jsx';
let React = require('react/addons');

export default class AdminFrontend {

    constructor(opt) {
        this.user = opt.user;
        this.query = opt.query;
        this.params = opt.params;
    }

    loadModel(modelName, id = null, params = {}, accum = {}) {
        return new Promise((resolve, reject) => {
            let Model = Models[modelName];
            params.refs = 'parent';
            if (!id) {
                return Model.find(params).then((Models) => {
                    accum[modelName + 'Collection'] = Models;
                    resolve(accum);
                }).catch((error) => reject(error))
            }
            return Model.findById(id, params).then((Model) => {
                accum[modelName] = Model;
                resolve(accum);
            }).catch((error) => reject(error));
        });
    }

    toString() {
        return this.renderToString();
    }

    renderToString() {
        return '<!DOCTYPE html>' + React.renderComponentToString(AdminPage({
            models: this._models
        }));
    }

    init() {
        return new Promise((resolve, reject) => {
            Promise.all([this.loadModel('Category')]).then((accum) => {
                this._models = accum[0];
                resolve(200);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}