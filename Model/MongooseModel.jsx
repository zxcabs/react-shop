import BaseModel from './BaseModel.jsx';

export default class MongooseModel extends BaseModel {
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

    static getSchema() {
        if (!this._schema) {
            let schema = this.generateSchema();
            if (!schema) {
                return null;
            }
            let mongo = this.getMongo();
            this._schema = new mongo.Schema(schema);
        }
        return this._schema;
    }

    static generateSchema() {
        return null;
    }

    static setServer(...args) {
        let res = super(...args);
        let schema = this.getSchema();
        if (!schema) {
            throw new Error(`Implement schema on Model ${this.name} before passing it to server`);
        }
        let mongo = this.getMongo();
        mongo.model(this.name, this.getSchema());
        return res;
    }

    static getMongo() {
        return require('mongo' + 'ose');
    }

    getMongo() {
        return this.constructor.getMongo();
    }

    static findOnServer(params) {
        return new Promise((resolve, reject) => {
            let mongoose = this.getMongo();
            let promise = mongoose.model(this.name).find(...this.prepareParams(params)).exec();
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
            let mongoose = this.getMongo();
            let model = mongoose.model(this.name);
            let fields = this.prepareParams[1] || null;
            let promise = model.findById(id, fields).exec();
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

    saveOnServer() {
        if (!this._mongoModel) {
            let mongoose = this.getMongo();
            let Model = mongoose.model(this.name);
            this._mongoModel = new Model(this._fields);
        }
        return new Promise((resolve, reject) => {
            this._mongoModel.save((err, res) => {
                if (err) {
                    return reject(err);
                }

                resolve();
            });
        });
    }
}

MongooseModel.name = 'Mongoose';