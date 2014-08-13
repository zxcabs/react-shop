/** @jsx React.DOM */
let React = require('react/addons');

export default React.createClass({
    render() {
        return(
            <div className="ProductTabs">
                <span data-index="0" className="ProductTabs__tab ProductTabs__tab--active">
                    Описание
                </span>
                <span data-index="1" className="ProductTabs__tab">
                    Характеристики
                </span>
                <div className="ProductTabs__info ProductTabs__info--active">
                    {this.props.text}
                </div>
                <div className="ProductTabs__info">
                    {this.props.attrs}
                </div>
            </div>
        );
    },
});