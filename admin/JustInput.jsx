/** @jsx React.DOM */
module React from 'react/addons';

export default React.createClass({
    render() {
        return (
        <label>
            <span>{this.props.key}</span>
            <input name={this.props.key} value={this.props.value} />
        </label>
        );
    }
});