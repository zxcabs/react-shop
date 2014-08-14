/** @jsx React.DOM */
let React = require('react/addons');

let AutocompleteItem = React.createClass({
    onClick(event) {
        this.props.bindValue(this.props.attr);
    },

    render() {
        return (
            <div onClick={this.onClick} className="AutocompleteForm__autocomplete__item">
                {this.props.attr.key}
            </div>
        );
    }
});

export default React.createClass({
    bindValue(attr) {
        this.props.setValue(attr);
    },

    mapOptionsAutoComplete() {
        return this.props.attrs.reduce((accum, attr) => {
            if (!accum.filtered) {accum.filtered = {};};
            if (!accum.filtered[attr.key]) {
                accum.filtered[attr.key] = true;
                accum.push(attr);
            }
            return accum;
        }, []).filter((attr) => {
            let value = this.props.key.trim().toLowerCase();
            if (!value) {
                return true;
            }
            return attr.key.toLowerCase().indexOf(value) !== -1;
        }).map((attr) => {
            return (
                <AutocompleteItem bindValue={this.bindValue} attr={attr} />
            );
        });
    },

    render() {
        let ACClasses = React.addons.classSet({
            'AutocompleteForm__autocomplete' : true,
            'AutocompleteForm__autocomplete--active' : this.props.isACOn,
        });

        return(
           <div className={ACClasses}>
                {this.mapOptionsAutoComplete()}
            </div>
        );
    },
});