import MongooseModel from './MongooseModel.jsx';
import Schema from './Schema.jsx';

class Category extends MongooseModel {
    static getDefaultRefs() {
        return ['childs'];
    }
}

class CategorySchema extends Schema {
    addFields() {
        this.add('description', {
            type: String,
            default: ''
        });

        this.add('childs', {
            type: [{
                type: Schema.ObjectId,
                ref: 'Category'
            }],
            default: []
        });
    }
}

Category.Schema = CategorySchema;
Category.setName('Category');

export default Category;