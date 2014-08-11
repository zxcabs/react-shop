import MongooseModel from './MongooseModel.jsx';
import Schema from './Schema.jsx';

export default class Attribute extends MongooseModel {

}

class AttributeSchema extends Schema {
    addFields() {
        this.add('name', {
            type: String,
            required: true
        });
    }
}

Attribute.Schema = AttributeSchema;
Attribute.name = 'Attribute';