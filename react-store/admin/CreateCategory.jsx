/** @jsx React.DOM */
let React = require('react/addons');

import CreateCategoryForm from './CreateCategoryForm.jsx'
import EditCategoryForm from './EditCategoryForm.jsx'

export default React.createClass({
    render : () => {
        return (
            <div className="CreateCategory">
                <div className="CreateCategory__parent-box">
                    <h1 className="CreateCategory__parent-box__heading">
                        Создание категории
                    </h1>
                    <CreateCategoryForm />
                </div>
                <div className="CreateCategory__parent-box">
                    <h1 className="CreateCategory__parent-box__heading">
                        Редактирование категории
                    </h1>
                    <EditCategoryForm />
                </div>
            </div>
        );
    },
});