import MongooseModel from './MongooseModel.jsx';
import Schema from './Schema.jsx';

class Attribute extends MongooseModel {

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
Attribute.setName('Attribute');

export default Attribute;