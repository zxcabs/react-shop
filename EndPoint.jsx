
export default class EndPoint {
    constructor(router, server) {
        this._server = server;
        this._router = router;
        this.mountEndPoints();
    }

    mountEndPoints() {
        return this;
    }

    route(...args) {
        return this._router.route(...args);
    }

    get server() {
        return this._server;
    }

    get router() {
        return this._router;
    }
}