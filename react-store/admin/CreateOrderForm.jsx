/** @jsx React.DOM */
let React = require('react/addons');

let newOrder = [
    {
        type: Number,
        name : 'telephone',
        value : 'Номер телефона'
    },
    {
        type: String,
        name : 'email',
        value : 'Адрес E-mail'
    },
];

export default React.createClass({
    prepareNewOrder() {
        return newOrder.map((field) => {
            return(
                <label>
                    <div>
                        {field.value}
                    </div>
                    <input type="text" name={field.name} />
                </label>
            );
        });
    },
    render() {
        return(
           <div className="CreateOrderForm">
                <form className="CreateOrderForm__form">
                    {this.prepareNewOrder()}
                </form>
                <div className="CreateOrderForm__footer">
                    <button className="btn btn__primary">
                        Сохранить
                    </button>
                </div>
            </div>
        );
    },
});