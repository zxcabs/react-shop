let express = require('express');
import models from './models'

export default class Shop {
    constructor(options) {
        this.options = options;
        this._express = express();
    }

    apiCreate(req, res) {

    }

    apiRead(req, res) {

    }

    apiUpdate(req, res) {

    }

    apiDelete(req, res) {

    }

    loadModel(req, res, next) {

    }

    loadUser() {

    }

    api() {
        this._api = express();
        this._api.route('/:model/:modelId/:relModel?/:relModelId?')
            .all(this.loadUser)
            .all(this.loadModel)
            .post(this.apiCreate)
            .get(this.apiRead)
            .put(this.apiUpdate)
            .delete(this.apiDelete)

        return this._api;
    }

    initRouter() {
        this._express.use('/api', this.api());
    }

    start(port) {
        this.initRouter();
        this._express.listen(port);
    }
}