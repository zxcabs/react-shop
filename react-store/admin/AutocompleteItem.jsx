/** @jsx React.DOM */
let React = require('react/addons');

export default React.createClass({
    setValue(event) {
        event.preventDefault();
        this.props.onSelect(this.props.model);
    },

    render() {
        return (
            <div onClick={this.setValue} className="AutocompleteItem">
                {this.props.model.get('name')}
            </div>
        );
    }
});