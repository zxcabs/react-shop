let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/test');
let utils = require('util');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

class BaseSchema extends mongoose.Schema {
    constructor(...args) {
        super(...args);

        this.statics.acl = function() {
            return true;
        };

        this.statics.getPageSize = function() {
            return 20;
        };
    }
}


let AttributeSchema = new BaseSchema({
    name: String,
    suffix: String
});

let CategorySchema = new BaseSchema({
    name: String
});

let ProductSchema = new BaseSchema({
    name: String,
    attributes: [{type: {type: BaseSchema.Types.ObjectId, ref: 'Attribute'}, value: String}],
    mainCategory: {type: BaseSchema.Types.ObjectId, ref: 'Category'},
    categories: [{type: BaseSchema.Types.ObjectId, ref: 'Category'}]
});

let CategoryModel = mongoose.model('Category', CategorySchema);
let AttributeModel = mongoose.model('Attribute', AttributeSchema);
let ProductModel = mongoose.model('Product', ProductSchema);

let models = {CategoryModel, AttributeModel, ProductModel};

function getModel(name) {
    try {
        return mongoose.model(name);
    } catch (e) {
        return null;
    }
}

function prepareParams(params, Model) {
    let res = [];
    let conditions = {};
    res.push(conditions);
    let fields = (params.fields || '').split(',').join(' ');
    res.push(fields.length ? fields : null);
    let options = {};
    options.limit = Model.getPageSize();
    if (params.page) {
        let page = Number(params.page);
        options.skip = page * options.limit;
    }
    res.push(options);
    return res;
}

function loadModels(method, modelName, modelId, objectToSave, query, User) {
    return new Promise((resolve, reject) => {
        let Model = getModel(modelName);
        if (!Model) {
            return reject(new Error(404));
        }

        if (!Model.acl(User)) {
            return reject(new Error(403));
        }

        if (method === 'POST') {
            if (modelId) {
                return reject(new Error(403));
            }
            objectToSave[modelName] = new Model();
            return resolve();
        } else if (method === 'PUT' && !modelId) {
            return reject(new Error(403));
        }

        if (!modelId) {
            return Model.find(...prepareParams(query, Model)).exec().then((models) => {
                let preparedName = modelName;
                if (preparedName.slice(-1) === 'y') {
                    preparedName = preparedName.slice(0, -1) + 'ie';
                }
                preparedName += 's';
                objectToSave[preparedName] = models || [];
                return resolve();
            }).onReject((error) => {
                return reject(error);
            });
        }

        return Model.findById(modelId, modelId).exec().then((model) => {
            objectToSave[modelName] = model;
            return resolve();
        }).onReject((error) => {
            return reject(error);
        });
    });
}

app.param('model', function(req, res, next) {
    if (!req.models) {
        req.models = {};
    }
    let User = null;
    loadModels(req.method, req.params.model, req.params.modelId, req.models, req.query, User)
    .then(() => next()).catch((error) => {
        console.log(error);
        res.status(404 || 403 || 500).end();
    });
});

app.param('relModel', function(req, res, next) {
    loadModels(req.method, req.params.relModel, req.params.relModelId, req.models, req.query)
    .then(() => next()).catch((error) => {
        console.log(error);
        res.status(404 || 403 || 500).end();
    });
});

function createOrUpdate(req, res) {
    let model = req.models[req.params.relModel || req.params.model];
    for (let key in req.body) {
        if (!req.body.hasOwnProperty(key)) {continue;}

        model[key] = req.body[key];
    }
    model.save(() => {
        res.send(model);
    });
}

function read(req, res) {
    res.send([req.params, req.models]);
}

function _delete(req, res) {
    let model = req.models[req.params.relModel || req.params.model];
    model.remove(() => res.status(200).send());
}

app.route('/api/data/:model/:modelId?/:relModel?/:relModelId?')
   .get(read)
   .post(createOrUpdate)
   .put(createOrUpdate)
   .delete(_delete);


app.listen(8080);