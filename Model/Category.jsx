import MongooseModel from './MongooseModel.jsx';
import Schema from './Schema.jsx';

class Category extends MongooseModel {
    static getDefaultRefs() {
        return ['parent'];
    }
}

class CategorySchema extends Schema {
    addFields() {
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
Category.setName('Category');

export default Category;