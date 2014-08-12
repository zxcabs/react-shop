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
            <textarea
                className="ProductForm__label__textarea"
                name={this.props.key}
                placeholder={this.props.key}
                valueLink={this.linkState('value')}
            ></textarea>
        </label>
        );
    }
});