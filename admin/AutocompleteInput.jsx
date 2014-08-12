/** @jsx React.DOM */
module React from 'react/addons';
import Models from '../Models.jsx';

export default React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState() {
        return {
            variants: [],
            query: ''
        }
    },

    requestChange(newValue) {
        this.props.setValue(this.props.key, newValue);
    },

    getVariants() {
        if (this.props.getVariants) {
            return this.props.getVariants.call(this);
        }

        return Models[this.props.schema.ref].find({
            search_field: 'name',
            search_query: this.state.query
        }).then((models) => {
            console.log(models);
        });
    },

    onKeyUp(event) {
        this.getVariants();
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
                onKeyUp={this.onKeyUp}
                autoComplete="off"
                className="ProductForm__label__input"
                type="text"
                name={this.props.key}
                placeholder={this.props.placeholder || this.props.key}
                valueLink={this.linkState('query')}
            />
        </label>
        );
    }
});