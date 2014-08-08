import MongooseModel from './MongooseModel.jsx';

export default class Category extends MongooseModel {
    static generateSchema() {
        return {
            name: String,
            status: {
                type: String,
                default: 'active'
            },
            parent: {
                type: this.getMongo().Schema.ObjectId,
                ref: 'Category'
            }
        };
    }
}

Category.name = 'Category';