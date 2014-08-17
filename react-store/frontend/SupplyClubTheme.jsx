import Layout from './Layout.jsx';
import MainPage from './MainPage.jsx';
import ThemeProductPage from './ThemeProductPage.jsx';
import IsomorphicRouter from '../IsomorphicRouter.jsx';

let SupplyClubTheme = new IsomorphicRouter();
SupplyClubTheme.onClientInit(() => {
    let initialJSON = document.querySelector('#initialData').value;
    let models = JSON.parse(initialJSON) || {};
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

function initLayoutModelsPromises(req) {
    let models = req.modelsPromises || {};
    models.CategoryCollection = Models.Category.find({});
    SupplyClubTheme.clientCache('modelsPromises', models);
}

function handleModelPromises(req) {
    let models = req.modelsPromises || {};
    let results = {};
    return Promise.all(Object.keys(models).map((key) => {
        return models[key].then((result) => {
            results[key] = result;
        });
    })).then(() => {
        req.models = results;
    });
}

function withLayout(req, Page) {
    return Layout({
        models: req.models,
        query: req.query,
        page: Page
    });
}

SupplyClubTheme.route('/product/:id', (req) => {
    initLayoutModelsPromises(req);
    let models = req.modelsPromises;
    models.Product = Models.Product.findById(req.params.id);
    handleModelPromises(req).then(() => req.render(withLayout(req, ThemeProductPage)));
});

SupplyClubTheme.route('/', (req) => {
    initLayoutModelsPromises(req);
    let models = req.modelsPromises;
    models.ProductCollection = Models.Products.find();
    handleModelPromises().then(() => req.render(withLayout(req, MainPage)));
});

// class asdSupplyClubTheme extends BaseController {
//     mountRoutes() {
//         this.route('/product/:id', () => {
//             new Promise((resolve, reject) => {
//                 let promises = [];
//                 promises.push(this.getLayoutModels());
//                 promises.push(this.loadModel('Product', this.params.id, this.query));
//                 Promise.all(promises).then(() => {
//                     resolve(200);
//                 }).catch((error) => {
//                     reject(error);
//                 });
//             }).then(() => {
//                 this.render(ThemeProductPage);
//             }).catch((error) => this.catchError(error));
//         });

//         this.route('/', () => {
//             new Promise((resolve, reject) => {
//                 let promises = [];
//                 promises.push(this.getLayoutModels());
//                 promises.push(this.loadModel('Product', null, this.query));
//                 Promise.all(promises).then(() => {
//                     resolve(200);
//                 }).catch((error) => {
//                     reject(error);
//                 });
//             }).then(() => {
//                 this.render(MainPage);
//             }).catch((error) => this.catchError(error));
//         });
//     }
// }

export default SupplyClubTheme;