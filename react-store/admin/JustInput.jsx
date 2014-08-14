/** @jsx React.DOM */
module React from 'react/addons';

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
            <input
                autoComplete="off"
                className="ProductForm__label__input"
                type="text"
                name={this.props.key}
                placeholder={this.props.placeholder || this.props.key}
                valueLink={Link}
            />
        </label>
        );
    }
});