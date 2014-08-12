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
            <select
                className="ProductForm__label__input"
                name={this.props.key}
                valueLink={Link}
            >
                {this.props.schema.enum.values.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
        );
    }
});