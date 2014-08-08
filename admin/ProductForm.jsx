/** @jsx React.DOM */
module React from 'react/addons';

export default React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState() {
        return {
            categories : this.props.categoryList,

            products : [{
                cat_id : 59,
                name : 'Hummingburd Purple',
                price : 5900
            }, {
                cat_id : 69,
                name : 'Игла убойная',
                price : 100
            }],

            new_product_cat_id : '',
            new_product_name : '',
            new_product_price : '',
        }
    },

    getCategories() {
        return this.props.categoryList.map((item) => {
            return (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            );
        });
    },

    onClick(event) {
        event.preventDefault();

        console.log('test', this.state.new_product_cat_id);
        let newProd = {
            cat_id : this.state.new_product_cat_id,
            name : this.state.new_product_name,
            price : this.state.new_product_price
        };

        let prods = this.state.products;
        prods.push(newProd);

        this.setState({
            products: prods,

            new_product_cat_id : '',
            new_product_name : '',
            new_product_price : '',
        });
    },

    toJSON() {
        alert(JSON.stringify(this.state));
    },

    render() {
        let prods = this.state.products.map((prod) => {
            return (
                <tr className="options-list__table__row">
                    <td className="options-list__table__row__cell">
                        {prod.cat_id}
                    </td>
                    <td className="options-list__table__row__cell">
                        {prod.name}
                    </td>
                    <td className="options-list__table__row__cell">
                        {prod.price}
                    </td>
                </tr>
            );
        });

        let selectState = this.linkState('new_product_cat_id');
        let handleSelectChange = (event) => selectState.requestChange(event.target.value);

        return (
            <div>
                <form className="product-form">
                    <label className="product-form__label">
                        <span className="product-form__label__description">
                            Название
                        </span>
                        <input autoComplete="off" className="product-form__label__input" type="text" name="name" placeholder="Название" valueLink={this.linkState('new_product_name')} />
                    </label>
                    <label className="product-form__label">
                        <span className="product-form__label__description">
                            Цена
                        </span>
                        <input autoComplete="off" className="product-form__label__input" type="text" name="price" placeholder="Цена" valueLink={this.linkState('new_product_price')} />
                    </label>
                    <label className="product-form__label">
                        <span className="product-form__label__description">
                            Главная категория
                        </span>
                        <select value={selectState} onChange={handleSelectChange}>
                            {this.getCategories()}
                        </select>
                    </label>
                </form>
                <div className="product-form__footer">
                    <button className="btn btn__primary" onClick={this.onClick} type="submit">
                        Сохранить
                    </button>
                </div>
            </div>
        );
    },
});