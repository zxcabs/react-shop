import MongooseModel from './MongooseModel.jsx';

export default class Attribute extends MongooseModel {
    static generateSchema() {
        return {
            name: String
        }
    }
}

Attribute.name = 'Attribute';