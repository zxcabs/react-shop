var React = require('react/addons');
if (typeof window !== 'undefined') {
    window.React = React;
}

import Models from '../Models.jsx';
import AdminPage from './AdminPage.jsx';
import BaseController from '../BaseController.jsx';

class AdminFrontend extends BaseController {
    cleanCache() {
        if (this._prevParams !== this.params) {
            this._prevParams = this.params;
            delete this._models[this.params.dashboard];
            delete this._models[this.params.dashboard + 'Collection'];
        }
    }

    mountRoutes() {
        this.route('/:dashboard/:id?/:tab?', () => {
            this.init().then(() => {
                this.render(AdminPage);
            }).catch(this.catchError.bind(this));
        });
    }

    init() {
        this.cleanCache();
        return new Promise((resolve, reject) => {
            let promises = [];
            promises.push(this.loadModel(this.params.dashboard, null, this.query));
            if (this.params.id) {
                promises.push(this.loadModel(this.params.dashboard, this.params.id, this.query));
            }
            Promise.all(promises).then(() => {
                if (promises.length > 1) {
                    let Model = this._models[this.params.dashboard];
                    let id = Model.get('_id') || '';
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
}

if (typeof window !== 'undefined') {
    new AdminFrontend().run();
}

export default AdminFrontend;