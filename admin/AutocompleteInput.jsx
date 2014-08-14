/** @jsx React.DOM */
module React from 'react/addons';
import Models from '../Models.jsx';
import AutocompleteItem from './AutocompleteItem.jsx';

export default React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState() {
        return {
            variants: [],
            visible: false,
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
            search: {
                field: 'name',
                query: this.state.query
            }
        }).then((models) => {
            let variants = models.slice();
            if (this.props.schema.ref === this.props.model.name) {
                variants = variants.filter((model) => {
                    return this.props.model.get('_id') !== model.get('_id');
                });
            }
            this.setState({
                variants: variants
            });
        });
    },

    onKeyUp(event) {
        this.getVariants();
    },

    onFocus(event) {
        if (!this.state.variants.length) {
            this.getVariants();
        }
        this.setState({
            visible: true
        });
    },

    onBlur(event) {
        setTimeout(() => {
            if (this.isMounted()) {
                this.setState({
                    visible: false
                });
            }
        }, 10);
    },

    setCurrent(item) {
        this.requestChange(item.get('_id'));
    },

    render() {
        let Link = {
            value: this.props.value,
            requestChange: this.requestChange
        }
        let autoCompleteClasses = React.addons.classSet({
            "AutocompleteList": true,
            "AutocompleteList--visible": this.state.visible
        });
        return (
        <label className="admin-label">
            <span className="ProductForm__label__description">
                {this.props.key}
            </span>
            <input
                onKeyUp={this.onKeyUp}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                autoComplete="off"
                className="AutocompleteInput"
                type="text"
                placeholder={this.props.placeholder || this.props.key}
                valueLink={this.linkState('query')}
            />
            <div className={autoCompleteClasses}>
                {this.state.variants.map((model) => {
                    return (<AutocompleteItem onSelect={this.setCurrent} model={model} />);
                })}
            </div>
        </label>
        );
    }
});