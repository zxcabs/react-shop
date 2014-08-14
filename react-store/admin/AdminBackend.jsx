import EndPoint from '../EndPoint.jsx';
import AdminFrontend from './AdminFrontend.jsx';

export default class AdminBackend extends EndPoint {
    mountEndPoints() {
        this.route('*').get((...args) => {
            this._getRequest(...args);
        });
        return this;
    }

    _getRequest(req, res) {
        new AdminFrontend(req, res).run();
    }
}