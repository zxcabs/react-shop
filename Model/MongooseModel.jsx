import BaseModel from './BaseModel.jsx';

class MongooseModel extends BaseModel {
    static getPageSize() {
        return 20;
    }

    static prepareParams(params) {
        let res = [];
        let conditions = {};
        res.push(conditions);
        let fields = (params.fields || '').split(',').join(' ');
        res.push(fields.length ? fields : null);
        let options = {};
        options.limit = this.getPageSize();
        if (params.page) {
            let page = Number(params.page);
            options.skip = page * options.limit;
        }
        res.push(options);
        return res;
    }

    toJSON() {
        if (!this._mongoModel) {
            return this._fields;
        }
        return this._mongoModel.toJSON();
    }

    toObject() {
        if (!this._mongoModel) {
            return this._fields;
        }
        return this._mongoModel.toObject();
    }

    static getSchema() {
        if (!this._schema) {
            this._schema = new this.Schema();
        }
        return this._schema;
    }

    getSchema() {
        return this.constructor.getSchema();
    }

    static init() {
        this.mongo.model(this._name, new this.mongo.Schema(this.getSchema().toObject()));
    }

    static get mongo() {
        return this.server.getMongo();
    }

    get mongo() {
        return this.constructor.mongo;
    }

    static populate(query, populate) {
        populate.split(',').forEach((populate) => {
            query.populate(populate);
        });
        return query;
    }

    static findOnServer(params) {
        return new Promise((resolve, reject) => {
            let query = this.mongo.model(this._name).find(...this.prepareParams(params));
            if (params.refs) {
                query = this.populate(query, params.refs);
            }
            let promise = query.exec();
            promise.then((models) => {
                resolve(models.map((model) => {
                    let newModel = new this(model.toObject({minimize: false}));
                    newModel._mongoModel = model;
                    newModel.notNew();
                    return newModel;
                }));
            }).onReject((error) => {
                reject(error);
            });
        });
    }

    static findByIdOnServer(id, params) {
        return new Promise((resolve, reject) => {
            let model = this.mongo.model(this._name);
            let fields = this.prepareParams[1] || null;
            let query = model.findById(id, fields);
            if (params.populate) {
                query = this.populate(query, params.refs);
            }
            let promise = query.exec();
            promise.then((model) => {
                let newModel = new this(model.toObject({minimize: false}));
                newModel._mongoModel = model;
                newModel.notNew();
                resolve(newModel);
            }).onReject((error) => {
                reject(error);
            });
        });
    }

    set(path, value) {
        if (this._mongoModel) {
            this._mongoModel.set(path, value);
            value = this._mongoModel.get(path);
        }
        return super(path, value);
    }

    get(path) {
        if (this._mongoModel) {
            return this._mongoModel.get(path);
        }
        return super(path);
    }

    saveOnServer(params) {
        if (!this._mongoModel) {
            let Model = this.mongo.model(this.name);
            this._mongoModel = new Model(this._fields);
        }
        return new Promise((resolve, reject) => {
            this._mongoModel.save((err, res) => {
                if (err) {
                    return reject(err);
                }

                let saved = (error, res) => {
                    this._fields = this._mongoModel.toObject();
                    if (error) {
                        return reject(error);
                    }

                    resolve();
                };
                if (params.refs) {
                    params.refs.split(',').forEach((ref) => this._mongoModel.populate(ref));
                    this._mongoModel.populate(saved);
                } else {
                    saved(err, res);
                }
            });
        });
    }
}

MongooseModel.setName('Mongoose');

export default MongooseModel;