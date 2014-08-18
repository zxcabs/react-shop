/** @jsx React.DOM */
let React = require('react/addons');

export default React.createClass({
    requestChange(newValue) {
        this.props.setValue(this.props.key, newValue);
    },

    render() {
        let Link = {
            value: this.props.value,
            requestChange: this.requestChange
        }
        return (
        <label className="ProductForm__label">
            <span className="ProductForm__label__description">
                {this.props.key}
            </span>
            <textarea
                className="ProductForm__label__textarea"
                name={this.props.key}
                placeholder={this.props.placeholder || this.props.key}
                valueLink={Link}
                cols="35"
                rows="10"
            ></textarea>
        </label>
        );
    }
});