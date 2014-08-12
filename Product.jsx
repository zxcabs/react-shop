import EndPoint from './EndPoint.jsx';
import ProductPage from './frontend/ProductPage.jsx';

export default class Product extends EndPoint {
    mountEndPoints() {
        let route = this.route('/:Product/:id');
        route.get(this._get.bind(this));
        return this;
    }

    _get(req, res) {
        let user = req.user;
        let query = req.query;
        let params = req.params;

        let frontend = new ProductPage({
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