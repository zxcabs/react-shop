/** @jsx React.DOM */
let React = require('react/addons');

export default React.createClass({
    renderSelection() {
        return(
            <div className="Selection">
                <a href="#">
                    <img src="/i/selection.jpg" className="Selection__image" />
                    <div className="Selection__shadow"></div>
                    <div className="Selection__text">
                        <div className="Selection__shop-now">
                            Купить сейчас
                        </div>
                        <span className="Selection__sale-time">
                            ДО 11 ОКТЯБРЯ 2014
                        </span>
                        <span className="Selection__name">
                            Подборка
                        </span>
                    </div>
                </a>
            </div>
        );
    },
    render() {
        return(
            <div className="Selections">
                {this.renderSelection()}
                {this.renderSelection()}
                {this.renderSelection()}
                {this.renderSelection()}
                {this.renderSelection()}
                {this.renderSelection()}
                {this.renderSelection()}
                {this.renderSelection()}
                {this.renderSelection()}
                {this.renderSelection()}
                {this.renderSelection()}
            </div>
        );
    },
});