import EndPoint from './EndPoint.jsx';
import SupplyClubTheme from './frontend/SupplyClubTheme.jsx';
import ProductPage from './frontend/ProductPage.jsx';

export default class SupplyClubFrontend extends EndPoint {
    mountEndPoints() {
        let route = this.route('/');
        route.get(this._get.bind(this));
        let productRoute = this.route('/:product/:id');
        productRoute.get(this.getProductLayout);
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