/** @jsx React.DOM */
let React = require('react/addons');

export default React.createClass({
    render() {
        return(
            <div className="StoreItem">
                <div className="StoreItem__image-and-details">
                    <a href={`/product/${this.props.data.get('_id')}`} >
                        <img className="StoreItem__image" src="/i/Prod.jpg" />
                    </a>
                    <div className="StoreItem__details">
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