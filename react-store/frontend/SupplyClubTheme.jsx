import Layout from './Layout.jsx';
import MainPage from './MainPage.jsx';
import ThemeProductPage from './ThemeProductPage.jsx';
import BaseController from '../BaseController.jsx';

class SupplyClubTheme extends BaseController {
    getLayoutModels() {
        if (!this._layoutPromise) {
            this._layoutPromise = new Promise((resolve, reject) => {
                let promises = [];
                promises.push(this.loadModel('Category', null, this.query));
                Promise.all(promises).then(() => {
                    resolve(200);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
        return this._layoutPromise;
    }

    mountRoutes() {
        this.route('/product/:id', () => {
            new Promise((resolve, reject) => {
                let promises = [];
                promises.push(this.getLayoutModels());
                promises.push(this.loadModel('Product', this.params.id, this.query));
                Promise.all(promises).then(() => {
                    resolve(200);
                }).catch((error) => {
                    reject(error);
                });
            }).then(() => {
                this.render(ThemeProductPage);
            }).catch((error) => this.catchError(error));
        });

        this.route('/', () => {
            new Promise((resolve, reject) => {
                let promises = [];
                promises.push(this.getLayoutModels());
                promises.push(this.loadModel('Product', null, this.query));
                Promise.all(promises).then(() => {
                    resolve(200);
                }).catch((error) => {
                    reject(error);
                });
            }).then(() => {
                this.render(MainPage);
            }).catch((error) => this.catchError(error));
        });
    }

    getLayout(Page) {
        return Layout({
            models: this._models,
            query: this.query,
            page: Page
        });
    }
}

if (typeof window !== 'undefined') {
    new SupplyClubTheme().run();
}

export default SupplyClubTheme;