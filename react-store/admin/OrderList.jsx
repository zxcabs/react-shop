/** @jsx React.DOM */
let React = require('react/addons');

let orders = [
    {
        id : 123,
        name : 'Иван Иванов',
        mount : 12,
        price : 16500,
        date : '10:08:2014 00:00:00',
        status : 'Incomplete'
    }, {
        id : 123,
        name : 'Иван Иванов',
        mount : 12,
        price : 16500,
        date : '10:08:2014 00:00:00',
        status : 'Incomplete'
    }, {
        id : 123,
        name : 'Иван Иванов',
        mount : 12,
        price : 16500,
        date : '10:08:2014 00:00:00',
        status : 'Incomplete'
    }, {
        id : 123,
        name : 'Иван Иванов',
        mount : 12,
        price : 16500,
        date : '10:08:2014 00:00:00',
        status : 'Incomplete'
    }, {
        id : 123,
        name : 'Иван Иванов',
        mount : 12,
        price : 16500,
        date : '10:08:2014 00:00:00',
        status : 'Incomplete'
    }
];

export default React.createClass({
    bindOrders() {
        return orders.map((order) => {
            return(
             <li className="OrderList__list__item">
                <div className="OrderList__list__item__headline">
                    <a href="" className="OrderList__list__item__headline__link">
                        #{order.id} / {order.name}
                    </a>
                </div>
                <small className="OrderList__list__item__headline__info">
                    {order.price} руб.
                    <span className="OrderList__list__item__headline__info__label OrderList__list__item__headline__info__label--active">
                            {order.status}
                    </span>
                </small>
            </li>
            );
        });
    },
    render() {
        return(
            <div className="OrderList">
                <h1 className="OrderList__heading">
                    Последние заказы
                </h1>
                <ul className="OrderList__list">
                    {this.bindOrders()}
                </ul>
            </div>
        );
    },
});