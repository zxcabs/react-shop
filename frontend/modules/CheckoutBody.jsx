/** @jsx React.DOM */
let React = require('react/addons');
import CheckoutShipping from './CheckoutShipping.jsx'
import CheckoutInfo from './CheckoutInfo.jsx'

export default React.createClass({
    render() {
        return(
            <div className="CheckoutBody">
                <span className="CheckoutBody__heading">
                    Оформление заказа
                </span>
                <CheckoutInfo />
                <CheckoutShipping />
            </div>
        );
    },
});