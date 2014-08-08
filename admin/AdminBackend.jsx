import EndPoint from '../EndPoint.jsx';
import AdminFrontend from './AdminFrontend.jsx';

export default class AdminBackend extends EndPoint {
    mountEndPoints() {
        let route = this.route('/:dashboard/:id?');
        route.get(this._get.bind(this));
        return this;
    }

    _get(req, res) {
        let user = req.user;
        let query = req.query;
        let params = req.params;

        let frontend = new AdminFrontend({
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