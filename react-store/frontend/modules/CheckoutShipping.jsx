/** @jsx React.DOM */
let React = require('react/addons');

export default React.createClass({
    render() {
        return(
            <form className="CheckoutShipping">
                <span className="CheckoutShipping__heading">
                    Детали доставки
                </span>
                <div className="CheckoutShipping__contents">
                    <div className="CheckoutShipping__contents__row">
                        <div>
                            <input className="CheckoutShipping__contents__row__input" name="" />
                            <figure className="CheckoutShipping__contents__row__figure" aria-required="true">
                            </figure>
                        </div>
                    </div>
                    <div className="CheckoutShipping__contents__row">
                        <div>
                            <input className="CheckoutShipping__contents__row__input" name="" />
                            <figure className="CheckoutShipping__contents__row__figure" aria-required="true">
                            </figure>
                        </div>
                    </div>
                    <div className="CheckoutShipping__contents__row">
                        <div>
                            <input className="CheckoutShipping__contents__row__input" name="" />
                            <figure className="CheckoutShipping__contents__row__figure" aria-required="true">
                            </figure>
                        </div>
                    </div>
                    <div className="CheckoutShipping__contents__row">
                        <div>
                            <input className="CheckoutShipping__contents__row__input" name="" />
                            <figure className="CheckoutShipping__contents__row__figure" aria-required="true">
                            </figure>
                        </div>
                    </div>
                </div>
            </form>
        );
    },
});