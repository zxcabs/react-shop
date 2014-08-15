/** @jsx React.DOM */
let React = require('react/addons');
import Models from '../Models.jsx';
import AutocompleteItem from './AutocompleteItem.jsx';

export default React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState() {
        return {
            variants: [],
            visible: false,
            picked: null,
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

        let modelName = '';
        if (Array.isArray(this.props.schema)) {
            modelName = this.props.schema[0].ref;
        } else {
            if (Array.isArray(this.props.schema.type)) {
                modelName = this.props.schema.type[0].ref;
            } else {
                modelName = this.props.schema.ref;
            }
        }

        if (!modelName) {
            throw new Error(`this "${this.props.key}" field is not ref field`);
        }

        return Models[modelName].find({
            search: {
                field: 'name',
                query: this.state.query
            }
        }).then((models) => {
            let variants = models.slice();
            if (modelName === this.props.model.name) {
                variants = variants.filter((model) => {
                    return this.props.model.get('_id') !== model.get('_id');
                });
            }
            let values = this.props.value;
            if (!Array.isArray(values) && values) {
                values = [values];
            } else if (!values) {
                value = [];
            }
            if (values.length) {
                variants = variants.filter((model) => {
                    return !values.filter((value) => {
                        return value._id === model.get('_id');
                    }).length;
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

    printValues() {
        if (!this.props.value) {
            return null;
        }

        let arr = Array.isArray(this.props.value) ? this.props.value : [this.props.value];
        return arr.map((value) => {
            return (
            <div>
                {value.name}
            </div>
            );
        });
    },

    setCurrent(item) {
        this.setState({
            query: item.get('name'),
            picked: item
        });
    },

    add() {
        let value = null;
        let current = this.getCurrent();
        if (!current) {
            return console.log('imlement new');
        }

        current = current.toObject();

        if (Array.isArray(this.props.value)) {
            value = this.props.value.slice();
            value.push(current);
        } else {
            value = current;
        }
        this.setState({
            picked: null,
            variants: [],
            query: ''
        });
        this.requestChange(value);
    },

    getCurrent() {
        if (this.state.picked) {
            let name = this.state.picked.get('name');
            if (name.trim().toLowerCase() === this.state.query.trim().toLowerCase()) {
                return this.state.picked;
            }
        }
        for (let item of this.state.variants) {
            if (item.get('name').trim().toLowerCase() === this.state.query.trim().toLowerCase()) {
                return item;
            }
        }
        return null;
    },

    render() {
        let autoCompleteClasses = React.addons.classSet({
            "AutocompleteList": true,
            "AutocompleteList--visible": this.state.visible
        });
        return (
        <label className="ProductForm__label">
            <span className="ProductForm__label__description">
                {this.props.key}
            </span>
            <div className="">
                {this.printValues()}
            </div>
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
            <button className="btn btn__primary" onClick={this.add} type="button">
                Добавить
            </button>
            <div className={autoCompleteClasses}>
                {this.state.variants.map((model) => {
                    return (<AutocompleteItem onSelect={this.setCurrent} model={model} />);
                })}
            </div>
        </label>
        );
    }
});