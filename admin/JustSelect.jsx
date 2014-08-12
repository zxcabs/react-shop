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
        <label className="ProductForm__label">
            <span className="ProductForm__label__description">
                {this.props.key}
            </span>
            <select
                className="ProductForm__label__input"
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