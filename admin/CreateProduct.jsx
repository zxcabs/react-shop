/** @jsx React.DOM */
module React from 'react/addons';

import ProductForm from './ProductForm.jsx'
import EditProductForm from './EditProductForm.jsx'
import CreateCategory from './CreateCategory.jsx'
import CreateOrder from './CreateOrder.jsx'

export default React.createClass({
    getDefaultProps() {
        return {
            categories: [
                {
                    id : 59,
                    name : 'Тату машинки'
                },
                {
                    id : 68,
                    name : 'Тату иглы',
                },
            ]
        };
    },
    render() {
        return (
            <div>
                <div className="CreateProduct">
                    <div className="CreateProduct__parent-box">
                        <h1 className="CreateProduct__parent-box__heading">
                            Создание товара
                        </h1>
                        <ProductForm categoryList={this.props.categories} />
                    </div>

                    <div className="CreateProduct__parent-box">
                        <h1 className="CreateProduct__parent-box__heading">
                            Редактирование товара
                        </h1>
                        <EditProductForm />
                    </div>
                </div>
                <CreateCategory />
                <CreateOrder />
            </div>
        );
    }
});



