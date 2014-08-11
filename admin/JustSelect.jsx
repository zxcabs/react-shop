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
            <select
                className="product-form__label__input"
                name={this.props.key}
                valueLink={this.linkState('value')}
            >
                {this.props.schema.available.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
        );
    }
});