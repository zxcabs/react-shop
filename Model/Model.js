export default class Model {
    find(params) {
        return Promise.resolve([]);
    }

    findOne(params) {
        return Promise.reject();
    }

    create(fields) {
        return Promise.reject();
    }

    remove() {
        return Promise.reject();
    }

    save() {
        return Promise.resolve();
    }

    static schema() {
        return {};
    }

    get(field) {

    }

    set(field, value) {

    }

    checkRights(User, actionType) {
        return true;
    }
}