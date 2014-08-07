let request = require('superagent');

export default class BaseModel {
    constructor(fields) {
        this._isNew = true;

        this.setFields(fields);
    }

    setFields(fields) {
        this._fields = fields;
    }

    acl(method, User, callback) {

    }

    static prepareParams(params) {

    }

    static find(params) {
        if (typeof window === 'undefined') {
            return this.findOnServer(params);
        }

        return this.findOnClient(params);
    }

    static findById(id, params) {
        if (typeof window === 'undefined') {
            return this.findByIdOnServer(id, params);
        }

        return this.findByIdOnClient(id, params);
    }

    static findOnServer(params) {
        return Promise.reject();
    }

    static findByIdOnServer(id, params) {
        return Promise.reject();
    }

    static findOnClient(params) {
        let name = this.name;
        return new Promise((resolve, reject) => {
            request.get(`/api/data/${name}`).query(params).end((res) => {
                name = `${name}Collection`;
                if (!res.result) {
                    return reject();
                } else if (!res.result.models) {
                    return reject();
                } else if (!res.result.models[name]) {
                    return reject();
                }

                let models = res.result.models[name].map((model) => new this(model));
                models = models.map((model) => model.notNew());
                resolve(models);
            });
        });
    }

    static findByIdOnClient(id, params) {
        let name = this.name;
        return new Promise((resolve, reject) => {
            request.get(`/api/data/${name}/${id}`).query(params).end((res) => {
                if (!res.result) {
                    return reject();
                } else if (!res.result.models) {
                    return reject();
                } else if (!res.result.models[name]) {
                    return reject();
                }

                let model = new this(res.result.models[name])
                model.notNew();
                resolve(model);
            });
        });
    }

    notNew() {
        this._isNew = false;
        return this;
    }

    isNew() {
        return this._isNew;
    }

    save() {
        let promise;
        if (typeof window === 'undefined') {
            promise = this.saveOnServer();
        } else {
            promise = this.saveOnClient();
        }
        return promise.then(() => this.notNew());
    }

    saveOnServer() {
        return Promise.reject();
    }

    saveOnClient() {
        let req = this.isNew ? 'post' : 'put';
        return new Promise((resolve, reject) => {
            request[req]().type('form').send(this._fields);
        });
    }
}