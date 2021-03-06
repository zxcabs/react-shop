import BaseModel from './BaseModel.jsx';
function escapeRegExp(str = '') {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
class MongooseModel extends BaseModel {
    static getPageSize() {
        return 20;
    }

    static prepareParams(params = {}) {
        let res = [];
        let conditions = {};
        if (params.query) {
            conditions['$text'] = {
                $search: params.query
            };
        }
        if (params.search) {
            conditions[params.search.field || 'name'] = {
                $regex: new RegExp(escapeRegExp(params.search.query)),
                $options: 'i'
            };
        }
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

    toObject() {
        if (this._mongoModel) {
            return this._mongoModel.toObject();
        }
        return this._fields;
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

    static getDefaultRefs() {
        return [];
    }

    static findOnServer(params = {}) {
        return new Promise((resolve, reject) => {
            let query = this.mongo.model(this._name).find(...this.prepareParams(params));

            let refs = 'refs' in params ? params.refs.split(',') : this.getDefaultRefs();
            if (refs.length) {
                query = this.populate(query, refs.join(' '));
            }
            query.sort('-_id');
            let promise = query.exec();
            promise.then((models) => {
                resolve(models.map((model) => {
                    let newModel = new this(model.toObject({minimize: false}));
                    newModel._mongoModel = model;
                    this.fixNullRefFields(newModel, refs);
                    newModel.notNew();
                    return newModel;
                }));
            }).onReject((error) => {
                reject(error);
            });
        });
    }

    static findByIdOnServer(id, params = {}) {
        return new Promise((resolve, reject) => {
            let model = this.mongo.model(this._name);
            let fields = this.prepareParams(params)[1] || null;
            let query = model.findById(id, fields);
            let refs = params.refs ? params.refs.split(',') : this.getDefaultRefs();
            if (refs.length) {
                query = this.populate(query, refs.join(' '));
            }
            let promise = query.exec();
            promise.then((model) => {
                let newModel = new this(model.toObject({minimize: false}));
                newModel._mongoModel = model;
                this.fixNullRefFields(newModel, refs);
                newModel.notNew();
                resolve(newModel);
            }).onReject((error) => {
                reject(error);
            });
        });
    }

    set(path, value) {
        if (this._mongoModel) {
            if (Array.isArray(value) && value.length) {
                if (value[0] && value[0]._id) {
                    value = value.map((model) => model._id);
                }
            }
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

    saveOnServer(params = {}) {
        if (!this._mongoModel) {
            let Model = this.mongo.model(this.name);
            this._mongoModel = new Model(this._fields);
        }
        return new Promise((resolve, reject) => {
            this._mongoModel.save((err, res) => {
                if (err) {
                    return reject(err);
                }

                this._fields = res.toObject();
                this._mongoModel = res;
                if (err) {
                    return reject(error);
                }

                let id = this._mongoModel.get('_id');
                this.constructor.findById(id, params).then((Model) => {
                    this._mongoModel = Model._mongoModel;
                    this._fields = this._mongoModel.toObject();
                    resolve();
                }).catch((error) => reject(error));
            });
        });
    }

    static fixNullRefFields(model, refs) {
        for (let field of refs) {
            if (model.get(field)) {continue;}
            let schema = model.getSchema();
            if ('default' in schema.get(field)) {
                model.set(field, schema.get(field).default);
            }
        }
    }

    fixNullRefFields(refs) {
        this.constructor.fixNullRefFields(this, refs);
    }

    getDefaultRefs() {
        return this.constructor.getDefaultRefs();
    }
}

MongooseModel.setName('Mongoose');

export default MongooseModel;