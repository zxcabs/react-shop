import MongooseModel from './MongooseModel.jsx';

export default class Product extends MongooseModel {
    static generateSchema() {
        return {
            name: String,
            attributes: [{
                type: this.getMongoSchema().ObjectId,
                ref: 'Attribute'
            }],
            price: {
                type: Number,
                default: 0
            },
            mainImage: String,
            weight: Number,
            description: String,
            mainCategory: {
                type: this.getMongoSchema().ObjectId,
                ref: 'Category'
            },
            categories: [{
                type: this.getMongoSchema().ObjectId,
                ref: 'Category'
            }],
            status: {
                type: String,
                default: 'active'
            }
        };
    }
}

Product.name = 'Product';
