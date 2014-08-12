/** @jsx React.DOM */
let React = require('react/addons');

export default React.createClass({
    render() {
        return(
            <div className="StoreItem">
                <div className="StoreItem__image-and-details">
                    <a href="#">
                        <img className="StoreItem__image" src="#" />
                    </a>
                    <div className="StoreItem__details StoreItem__details--active">
                        <a href="#" className="StoreItem__details__fast-look">
                            Быстрый просмотр
                        </a>
                    </div>
                </div>
                <div className="StoreItem__mobile-text">
                    <span className="StoreItem__model">
                        Модель здесь.
                    </span>
                    <a href="#" className="StoreItem__name">
                        {this.props.data.get('name')}
                    </a>
                    <span className="StoreItem__price">
                        {this.props.data.get('price')} руб. <del className="StoreItem__price__deleted">5500 руб.</del>
                    </span>
                </div>
            </div>
        );
    },
});