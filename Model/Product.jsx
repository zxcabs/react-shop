import MongooseModel from './MongooseModel.jsx';

export default class Product extends MongooseModel {
    static generateSchema() {
        return {
            name: String,
            attributes: [{
                type: this.getMongo().Schema.Types.ObjectId,
                ref: 'Attribute'
            }],
            mainCategory: {
                type: this.getMongo().Schema.Types.ObjectId,
                ref: 'Category'
            },
            categories: [{
                type: this.getMongo().Schema.Types.ObjectId,
                ref: 'Category'
            }]
        };
    }
}

Product.name = 'Product';
