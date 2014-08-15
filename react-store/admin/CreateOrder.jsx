/** @jsx React.DOM */
let React = require('react/addons');

import CreateOrderForm from './CreateOrderForm.jsx'
import EditOrderForm from './EditOrderForm.jsx'

export default React.createClass({
    render() {
        return (
            <div className="CreateCategory">
                <div className="CreateCategory__parent-box">
                    <h1 className="CreateCategory__parent-box__heading">
                        Создание заказа
                    </h1>
                    <CreateOrderForm />
                </div>
                <div className="CreateCategory__parent-box">
                    <h1 className="CreateCategory__parent-box__heading">
                        Редактирование заказа
                    </h1>
                    <EditOrderForm />
                </div>
            </div>
        );
    },
});