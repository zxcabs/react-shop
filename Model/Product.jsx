import MongooseModel from './MongooseModel.jsx';
import Schema from './Schema.jsx';

export default class Product extends MongooseModel {

}

class ProductSchema extends Schema {
    constructor(...args) {
        super(...args);

        this.add('name', {
            type: String,
            required: true
        }).add('attributes', [{
            type: Schema.ObjectId,
            ref: 'Attribute'
        }]).add('mainCategory', {
            type: Schema.ObjectId,
            ref: 'Category'
        }).add('categories', [{
            type: Schema.ObjectId,
            ref: 'Category'
        }]);
    }
}

Product.Schema = ProductSchema;
Product.name = 'Product';
