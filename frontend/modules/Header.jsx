/** @jsx React.DOM */
let React = require('react/addons');

export default React.createClass({
    render() {
        return(
            <div className="Header">
                <div className="Header__wrap">
                    <a href="/" className="Header__wrap__logo">
                        Supply Club
                    </a>
                    <span className="Header__wrap__cart"></span>
                    <span className="Header__wrap__search"></span>
                </div>
            </div>
        );
    },
});