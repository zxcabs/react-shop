import EndPoint from './EndPoint.jsx';
import SupplyClubTheme from './frontend/SupplyClubTheme.jsx';
import ProductPage from './frontend/ProductPage.jsx';
import CategoryPage from './frontend/CategoryPage.jsx';

export default class SupplyClubFrontend extends EndPoint {
    mountEndPoints() {
        let productRoute = this.route('/product/:id');
        productRoute.get(this.getProductLayout);

        let categoryRoute = this.route('/category/:id');
        categoryRoute.get(this.getCategoryLayout);

        let route = this.route('/');
        route.get(this._get.bind(this));

        return this;
    }

    getProductLayout(req, res) {
        let user = req.user;
        let query = req.query;
        let params = req.params;

        let layout = new ProductPage({
            user,
            query,
            params
        });

        layout.init().then((code) => {
            res.status(code || 200).send(layout.toString());
        }).catch((error) => {
            res.status(500).send(error);
        });
    }

    getCategoryLayout(req, res) {
        let user = req.user;
        let query = req.query;
        let params = req.params;

        let layout = new CategoryPage({
            user, query, params
        });

        layout.init().then((code) => {
            res.status(code || 200).send(layout.toString());
        }).catch((error) => {
            res.status(500).send(error);
        });
    }

    _get(req, res) {
        let user = req.user;
        let query = req.query;
        let params = req.params;

        let frontend = new SupplyClubTheme({
            user,
            query,
            params
        });
        frontend.init().then((code) => {
            res.status(code || 200).send(frontend.toString());
        }).catch((error) => {
            res.status(500).send(error);
        });
    }
}