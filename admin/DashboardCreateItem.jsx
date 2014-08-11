/** @jsx React.DOM */
module React from 'react/addons';

import ProductForm from './ProductForm.jsx'
import EditProductForm from './EditProductForm.jsx'
import CreateCategory from './CreateCategory.jsx'
import CreateOrder from './CreateOrder.jsx'

import JustInput from './JustInput.jsx'

let Views = {
    name: JustInput
};

let ViewsEnabledForNew = {
    name: true
}

export default React.createClass({
    getPlainObject() {
        return this.props.model.toObject();
    },

    renderNew() {
        let res = {};
        let hashMap = this.getPlainObject();
        let schema = this.props.model.getSchemaPlainObj();
        for (let key in ViewsEnabledForNew) {
            if (!ViewsEnabledForNew.hasOwnProperty(key)) {continue;}
            if (!(key in schema)) {continue;}
            if (!Views[key]) {continue;}
            let View = Views[key];
            res[key] = (<View key={key} value={hashMap[key]} />);
        }
        return res;
    },

    renderUpdate() {

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
                    </form>
                </div>
            </div>
        );
    }
});



