import MongooseModel from './MongooseModel.jsx';
import Schema from './Schema.jsx';

export default class Category extends MongooseModel {

}

class CategorySchema extends Schema {
    addFields() {
        this.add('name', {
            type: String,
            required: true
        });

        this.add('description', {
            type: String,
            default: ''
        });

        this.add('parent', {
            type: Schema.ObjectId,
            ref: 'Category'
        });
    }
}

Category.Schema = CategorySchema;
Category.name = 'Category';