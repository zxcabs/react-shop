import MongooseModel from './MongooseModel.jsx';

export default class User extends MongooseModel {
    is(role) {
        return this.role === role;
    }

    static generateSchema() {
        return {
            email: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String,
                required: true
            },
            role: String,
            name: {
                first: String,
                middle: String,
                last: String
            }
        };
    }
}

User.name = 'User';
