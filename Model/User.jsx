import MongooseModel from './MongooseModel.jsx';
import Schema from './Schema.jsx';

export default class User extends MongooseModel {
    is(role) {
        return this.role === role;
    }
}

class UserSchema extends Schema {
    constructor(...args) {
        super(...args);

        this.add('email', {
            type: String,
            required: true,
            unique: true
        }).add('password', {
            type: String,
            required: true
        }).add('role', {
            type: String,
            default: 'user'
        });
    }
}

User.Schema = UserSchema;
User.name = 'User';
