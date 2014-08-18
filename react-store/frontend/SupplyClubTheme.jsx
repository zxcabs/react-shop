import Layout from './Layout.jsx';
import MainPage from './MainPage.jsx';
import Models from '../Models.jsx';
import ThemeProductPage from './ThemeProductPage.jsx';
import IsomorphicRouter from '../IsomorphicRouter.jsx';
let _ = require('lodash');

if (typeof window !== 'undefined') {
    window.React = require('react/addons');
}

let SupplyClubTheme = new IsomorphicRouter();
SupplyClubTheme.onClientInit(() => {
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
            models[key].notNew();
        }
    }
    SupplyClubTheme.clientCache('models', models);
});

function loadModel(ModelName, id = null, params = {}, nameToSave = '') {
    if (!nameToSave) {nameToSave = ModelName;}
    let models = SupplyClubTheme.clientCache('models') || {};
    let cacheKey = ModelName+nameToSave+id;
    if (!SupplyClubTheme.clientCache(cacheKey)) {
        SupplyClubTheme.clientCache(cacheKey, params);
    }
    let prevParams = SupplyClubTheme.clientCache(cacheKey);
    let isSameParams = _.isEqual(prevParams, params);
    let currentModel = models[nameToSave];
    if (currentModel && isSameParams) {
        if (!id && Array.isArray(currentModel)) {
            return Promise.resolve(currentModel);
        }
        if (id && currentModel.get && currentModel.get('_id') == id) {
            return Promise.resolve(currentModel);
        }
    }
    SupplyClubTheme.clientCache(cacheKey, params);
    if (!id) {
        return Models[ModelName].find(params);
    }
    return Models[ModelName].findById(id, params);
}

function initLayoutModelsPromises(req) {
    let modelsPromises = {};
    modelsPromises.CategoryCollection = loadModel('Category', null, {}, 'CategoryCollection');
    return modelsPromises;
}

function handleModelPromises(req, models) {
    let results = {};
    return Promise.all(Object.keys(models).map((key) => {
        return models[key].then((result) => {
            results[key] = result;
        });
    })).then(() => {
        SupplyClubTheme.clientCache('models', results);
        req.models = results;
    });
}

function withLayout(req, Page) {
    return Layout({
        models: req.models,
        page: Page
    });
}

SupplyClubTheme.route('/product/:id', (req) => {
    let models = initLayoutModelsPromises(req);
    models.Product = loadModel('Product', req.params.id);
    handleModelPromises(req, models).then(() => req.render(withLayout(req, ThemeProductPage)));
});

SupplyClubTheme.route('/', (req) => {
    let models = initLayoutModelsPromises(req);
    models.ProductCollection = loadModel('Product', null, {}, 'ProductCollection');
    handleModelPromises(req, models).then(() => req.render(withLayout(req, MainPage)));
});

export default SupplyClubTheme;