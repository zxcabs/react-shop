/** @jsx React.DOM */
let React = require('react/addons');

export default React.createClass({
    render() {
        return(
            <div className="Panno">
                <div className="Panno__container">
                    <span className="Panno__container__heading">
                        Something here
                    </span>
                    <span className="Panno__container__text">
                        Something here Something here Something here Something here Something here Something here Something here Something here
                    </span>
                    <div className="Panno__container__buttons">
                        <button className="StoreButton">
                            Захуячить покупки
                        </button>
                    </div>
                </div>
                <img src="/i/Panno.jpg" className="Panno__image" />
                <div className="Panno__darker"></div>
            </div>
        );
    },
});