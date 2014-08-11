import MongooseModel from './MongooseModel.jsx';
import Schema from './Schema.jsx';

export default class Attribute extends MongooseModel {

}

class AttributeSchema extends Schema {
    constructor(...args) {
        super(...args);
        this.add('name', {
            type: String,
            required: true
        });
    }
}

Attribute.Schema = AttributeSchema;
Attribute.name = 'Attribute';