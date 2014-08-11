
export default class Schema {
    static get ObjectId() {
        if (typeof window === 'undefined') {
            return this.server.getMongo().Schema.Types.ObjectId;
        }

        return function ObjectId() {}
    }

    static get server() {
        if (!this._server) {
            throw new Error('Set server before use schema');
        }
        return this._server;
    }

    static set server(value) {
        this._server = value;
    }

    get server() {
        return this.constructor.server;
    }

    constructor() {
        this._list = [];
        this._obj = {};
        this.add('status', {
            type: String,
            default: 'active'
        });
    }

    add(name, value) {
        if (this._obj[name]) {
            throw new Error(`Remove ${name} from schema before set new`);
        }
        this._obj[name] = value;
        value.__name = name;
        this._list.push(value);
        return this;
    }

    remove(name) {
        let value = this._obj[name];
        delete this._obj[name];
        return this._list.splice(this._list.indexOf(value), 1);
    }

    toObject() {
        return this._obj;
    }

    toIterator() {
        return this._list;
    }

    get(name) {
        if (!this._obj[name]) {
            throw new Error(`There is no field named ${name} in schema`);
        }
        return this._obj[name];
    }
}