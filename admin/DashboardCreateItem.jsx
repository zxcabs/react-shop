/** @jsx React.DOM */
module React from 'react/addons';

import ProductForm from './ProductForm.jsx'
import EditProductForm from './EditProductForm.jsx'
import CreateCategory from './CreateCategory.jsx'
import CreateOrder from './CreateOrder.jsx'

export default React.createClass({
    getPlainObject() {
        return this.props.model.toObject();
    },

    getViewForAttr(name) {
        let View = this.props.dashboard.fields[name];
        if (!View) {
            throw new Error(`There is no view for required field ${name}`);
        }
        return View;
    },

    renderNew() {
        let res = {};
        let hashMap = this.getPlainObject();
        let required = this.props.model.getSchema().toIterator().filter((attr) => attr.required);
        return required.map((attr) => {
            let View = this.getViewForAttr(attr.__name);
            return (
                <View
                    key={attr.__name}
                    schema={attr}
                    value={hashMap[attr.__name] || attr.default || ''}
                />);
        });
    },

    renderUpdate() {
        return (
        <div>
            <div className="tabs">
                {this.renderTabs()}
            </div>
            <div className="fields">
                {this.renderFields()}
            </div>
        </div>
        );
    },

    renderTabs() {
        return this.props.dashboard.layout.map((tab) => {
            return (
            <a href="#" key={tab.name} className="EditProductForm__controls__list__item__link">
                {tab.name}
            </a>
            );
        });
    },

    renderFields() {
        let schema = this.props.model.getSchema().toObject();
        let hashMap = this.getPlainObject();
        return this.props.dashboard.layout[0].fields.map((field) => {
            let attr = schema[field];
            let View = this.getViewForAttr(field);
            return (
                <View
                    key={field}
                    schema={attr}
                    value={hashMap[field] || attr.default || ''}
                />);
        });
    },

    render() {
        let id = this.props.model.get('_id');
        let actionUrl = '/api/data/' + this.props.modelName + (id ? '/' + id :'');
        return (
            <div>
                <div className="DashboardCreateItem">
                    <div className="DashboardCreateItem__parent-box">
                        <h1 className="DashboardCreateItem__parent-box__heading">
                            {this.props.model.isNew() ? "Создание" : "Редактирование"}
                        </h1>
                    </div>
                    <form method="POST" action={actionUrl}>
                        {this.props.model.isNew()
                            ? null : (<input type="hidden" name="_method" value="PUT" />)}
                        {this.props.model.isNew() ? this.renderNew() : this.renderUpdate()}

                        <div className="product-form__footer">
                            <button className="btn btn__primary" type="submit">
                                Сохранить
                            </button>
                            <button className="btn" type="cancel">
                                Отменить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
});



