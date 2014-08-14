import MongooseModel from './MongooseModel.jsx';
import Schema from './Schema.jsx';

class Attribute extends MongooseModel {

}

class AttributeSchema extends Schema {
    addFields() {
        this.get('name').unique = true;
    }
}

Attribute.Schema = AttributeSchema;
Attribute.setName('Attribute');

export default Attribute;