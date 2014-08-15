import EndPoint from './EndPoint.jsx';
import SupplyClubTheme from './frontend/SupplyClubTheme.jsx';

export default class SupplyClubFrontend extends EndPoint {
    mountEndPoints() {
        this.route('*').get((...args) => {
            this._getRequest(...args);
        });
        return this;
    }

    _getRequest(req, res) {
        new SupplyClubTheme(req, res).run();
    }
}