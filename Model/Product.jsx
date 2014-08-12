import MongooseModel from './MongooseModel.jsx';
import Schema from './Schema.jsx';

class Product extends MongooseModel {

}

class ProductSchema extends Schema {
    addFields() {
        this.add('name', {
            type: String,
            required: true
        }).add('price', {
            type: Number,
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
        }]).add('description', {
            type: String,
            default: ''
        }).add('quantity', {
            type: Number,
            default: 0
        }).add('availability', {
            type: Boolean,
            default: true
        });
    }
}

Product.Schema = ProductSchema;
Product.setName('Product');

export default Product;
