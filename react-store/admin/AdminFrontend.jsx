var React = require('react/addons');
if (typeof window !== 'undefined') {
    window.React = React;
}

import Models from '../Models.jsx';
import AdminPage from './AdminPage.jsx';
import IsomorphicRouter from '../IsomorphicRouter.jsx';

let AdminFrontend = new IsomorphicRouter();
AdminFrontend.onClientInit(() => {
    let initialJSON = unescape(document.documentElement.getAttribute('models-json') || '');
    document.documentElement.removeAttribute('models-json');
    let models = JSON.parse(initialJSON || '') || {};
    for (let key in models) {
        if (!models.hasOwnProperty(key)) {continue;}
        let modelName = key;
        if (Array.isArray(models[key])) {
            modelName = key.slice(0, key.lastIndexOf('Collection'));
            models[key] = models[key].map((obj) => {
                let model = new Models[modelName](obj);
                model.notNew();
                return model;
            });
        } else {
            models[key] = new Models[modelName](models[key]);
            if (models[key].get('_id')) {
                models[key].notNew();
            }
        }
    }
    AdminFrontend.clientCache('models', models);
});

function loadModels(req) {
    let promises = [];
    let models = AdminFrontend.clientCache('models') || {};
    let prevParams = AdminFrontend.clientCache('prevParams') || {};
    let dashboardName = req.params.dashboard;
    let isSameDashboard = prevParams.dashboard === dashboardName;
    let isSameId = prevParams.id === req.params.id;
    let Model = Models[req.params.dashboard];

    if (models[dashboardName + 'Collection'] && isSameDashboard) {
        promises.push(Promise.resolve(models[dashboardName + 'Collection']));
    } else {
        promises.push(Model.find(req.query));
    }

    if (req.params.id) {
        if (models[dashboardName] && isSameDashboard && isSameId && req.params.id !== 'new') {
            promises.push(Promise.resolve(models[req.params.dashboard]));
        } else {
            if (req.params.id === 'new') {
                promises.push(Promise.resolve(new Model()))
            } else {
                promises.push(Model.findById(req.params.id, req.query));
            }
        }
    }
    AdminFrontend.clientCache('prevParams', req.params);

    return Promise.all(promises);
}

AdminFrontend.route('/:dashboard/:id?/:tab?', (req) => {
    loadModels(req).then((result) => {
        let models = {};
        models[req.params.dashboard + 'Collection'] = result[0];
        if (result.length > 1) {
            models[req.params.dashboard] = result[1];
            let ModelInstance = models[req.params.dashboard];
            let id = ModelInstance.get('_id') || '';
            let Collection = models[req.params.dashboard + 'Collection'];
            for (let index = 0; index < Collection.length; index++) {
                if (Collection[index].get('_id').toString() !== id.toString()) {
                    continue;
                }
                Collection.splice(index, 1, ModelInstance);
                break;
            }
        }
        AdminFrontend.clientCache('models', models);
        req.render(AdminPage({
            params: req.params,
            prefix: req.prefix,
            models: models,
            query: req.query
        }));
    }).catch((error) => {
        req._models = {};
        req.error(error);
    });
});

export default AdminFrontend;