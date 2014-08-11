import MongooseModel from './MongooseModel.jsx';

export default class Category extends MongooseModel {
    static generateSchema() {
        return {
            name: {
                type: String,
                default: ''
            },
            status: {
                type: String,
                default: 'active'
            },
            parent: {
                type: this.getMongoSchema().ObjectId,
                ref: 'Category'
            }
        };
    }
}

Category.name = 'Category';