let request = require('superagent');

class BaseModel {
    constructor(fields) {
        this._isNotNew = false;
        this.setFields(fields);
    }

    setFields(fields) {
        this._fields = fields || {};
        this._initialFields = fields;
    }

    dropChanges() {
        this._fields = Object.create(this._initialFields);
    }

    toJSON() {
        return this._fields;
    }

    static set server(server) {
        this._server = server;
        return this;
    }

    static get server() {
        return this._server;
    }

    static init() {
        return this;
    }

    get server() {
        return this.constructor.server;
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
        throw new Error('Implement method findOnServer');
        return Promise.reject();
    }

    static findByIdOnServer(id, params) {
        throw new Error('Implement method findByIdOnServer');
        return Promise.reject();
    }

    static findOnClient(params) {
        let name = this._name;
        return new Promise((resolve, reject) => {
            request.get(`/api/data/${name}`).query(params).end((res) => {
                name = `${name}Collection`;
                if (!res.body.result) {
                    return reject();
                } else if (!res.body.result.models) {
                    return reject();
                } else if (!res.body.result.models[name]) {
                    return reject();
                }

                let models = res.body.result.models[name].map((model) => new this(model));
                models = models.map((model) => model.notNew());
                resolve(models);
            });
        });
    }

    static findByIdOnClient(id, params) {
        let name = this._name;
        return new Promise((resolve, reject) => {
            request.get(`/api/data/${name}/${id}`).query(params).end((res) => {
                if (!res.body.result) {
                    return reject();
                } else if (!res.body.result.models) {
                    return reject();
                } else if (!res.body.result.models[name]) {
                    return reject();
                }

                let model = new this(res.body.result.models[name]);
                model.notNew();
                resolve(model);
            });
        });
    }

    get name() {
        return this.constructor._name;
    }

    static setName(value) {
        this._name = value;
    }

    get(path = '') {
        path = path.split('.').reverse();
        let currentLevel = this._fields;
        while (currentLevel && path.length) {
            currentLevel = currentLevel[path.pop()];
        }

        if (path.length) {
            return null;
        }

        if (Array.isArray(currentLevel)) {
            return currentLevel.slice();
        }

        if (typeof currentLevel === 'object' && currentLevel !== null) {
            return Object.create(currentLevel);
        }

        return currentLevel;
    }

    set(path, value) {
        if (!this.isNew()) {
            this._changed = true;
        }
        if (!this._fields) {
            this._fields = {};
        }
        path = path.split('.').reverse();
        let element = path.shift();
        let currentLevel = this._fields;
        while (path.length) {
            let node = path.pop();
            if (!currentLevel[node]) {
                currentLevel[node] = {};
            }
            currentLevel = currentLevel[node];
        }
        currentLevel[element] = value;
        return this;
    }

    acl(method, User, callback) {
        return true;
    }

    notNew() {
        this._isNotNew = true;
        return this;
    }

    isNew() {
        return !this._isNotNew;
    }

    isChanged() {
        return !!this._changed;
    }

    save(params) {
        let promise;
        if (typeof window === 'undefined') {
            promise = this.saveOnServer(params);
        } else {
            promise = this.saveOnClient(params);
        }
        promise.then(() => this._initialFields = Object.create(this._fields));
        if (this.isNew()) {
            promise.then(() => this.notNew());
        }
        if (this.isChanged()) {
            promise.then(() => this.notChanged());
        }
        return promise;
    }

    saveOnServer() {
        throw new Error('Implement method saveOnServer');
        return Promise.reject();
    }

    saveOnClient() {
        let req = this.isNew ? 'post' : 'put';
        let name = this.name;
        return new Promise((resolve, reject) => {
            request[req](`/api/data/${name}/${this.id}`).type('form').send(this._fields).end((res) => {
                if (!res.body.result) {
                    return reject();
                } else if (!res.body.result.models) {
                    return reject();
                } else if (!res.body.result.models[name]) {
                    return reject();
                }

                this.setFields(res.body.result.models[name]);
                this.notNew();
                resolve(this);
            });
        });
    }
}

BaseModel.setName('Base');

export default BaseModel;