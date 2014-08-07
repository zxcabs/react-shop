


class BaseSchema extends mongoose.Schema {
    constructor(...args) {
        super(...args);

        this.method('acl', function(method, User, callback) {
            if (callback) {
                callback(true);
            }
            return true;
        });

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
    parent: BaseSchema.Types.ObjectId,
    name: String
});

let ProductSchema = new BaseSchema({
    name: String,
    attributes: [{type: {type: BaseSchema.Types.ObjectId, ref: 'Attribute'}, value: String}],
    mainCategory: {type: BaseSchema.Types.ObjectId, ref: 'Category'},
    categories: [{type: BaseSchema.Types.ObjectId, ref: 'Category'}]
});

let crypt = (string) => bcrypt.hashSync(string, bcrypt.genSaltSync(8), null)
let UserSchema = new BaseSchema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        set: crypt
    },
    role: String,
    name: {
        first: String,
        middle: String,
        last: String
    }
});

UserSchema.method('is', function(role) {
    return this.role === role;
});

UserSchema.method('acl', function(method, User, callback) {
    let res = User.id === Item.id || User.is('admin');
    if (method === 'POST') {
        res = User.is('guest') || User.is('admin');
    }
    if (callback) {
        callback(res);
    }
    return res;
});

let roles = ['user', 'guest', 'admin'];

let CategoryModel = mongoose.model('Category', CategorySchema);
let AttributeModel = mongoose.model('Attribute', AttributeSchema);
let ProductModel = mongoose.model('Product', ProductSchema);
let UserModel = mongoose.model('User', UserSchema);

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

        if (method === 'POST') {
            if (modelId) {
                return reject(new Error(403));
            }
            objectToSave[modelName] = new Model();
            if (!objectToSave[modelName].acl(method, User)) {
                objectToSave[modelName] = null;
                delete objectToSave[modelName];
                return reject(new Error(403));
            }
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

        return Model.findById(modelId).exec().then((model) => {
            objectToSave[modelName] = model;
            if (!objectToSave[modelName].acl(method, User)) {
                objectToSave[modelName] = null;
                delete objectToSave[modelName];
                return reject(new Error(403));
            }
            return resolve();
        }).onReject((error) => {
            return reject(error);
        });
    });
}
