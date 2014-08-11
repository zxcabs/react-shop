/** @jsx React.DOM */
module React from 'react/addons';

export default React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState() {
        return {
            value: this.props.value
        }
    },

    render() {
        return (
        <label className="product-form__label">
            <span className="product-form__label__description">
                {this.props.key}
            </span>
            <input autoComplete="off" className="product-form__label__input" type="text" name={this.props.key} placeholder={this.props.key} valueLink={this.linkState('value')} />
        </label>
        );
    }
});