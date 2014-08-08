/** @jsx React.DOM */

module React from 'react/addons';

import AutocompleteModule from './AutocompleteModule.jsx'

export default React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    componentDidMount() {
        window.asd = this;
    },

    updateAttr(index, newValue) {
        this.state.list[index].value = newValue;
        this.setState({list: this.state.list});
    },

    deleteAttr(index, event) {
        let list = this.state.list;

        list.splice(index, 1);

        this.setState({
            list
        });
    },

    getInitialState() {
        return {
            list: [{
                id : 1,
                key : 'Материал',
                value : 'Бетон'
            }],
            newKey: '',
            newValue: ''
        };
    },

    onClick(event) {
        event.preventDefault();

        let newAttribute = {
            key: this.state.newKey,
            value: this.state.newValue
        };

        let list = this.state.list;
        list.push(newAttribute);

        this.setState({
            list: list,
            newKey: '',
            newValue: ''
        });
    },

    autocompleteEnable(event) {
        this.setState({
            isACOn : true
        });
    },

    autocompleteDisable(event) {
        setTimeout(() => {
            this.setState({
                isACOn : false
            });
        }, 50);
    },

    setValue(attr) {
        this.setState({
            newKey: attr.key
        });
    },

    render() {

        return(
            <div className="AutocompleteForm-and-options-list">
                <form className="AutocompleteForm">
                    <label>
                        Название х-ки
                        <input onFocus={this.autocompleteEnable} onBlur={this.autocompleteDisable} valueLink={this.linkState('newKey')} onKeyUp={this.autocompleteEnable} type="text" name="name" autoComplete="off" />
                    </label>
                    <AutocompleteModule setValue={this.setValue} attrs={this.state.list} isACOn={this.state.isACOn}  key={this.state.newKey} />
                    <div className="AutocompleteForm__key-value">
                        <div className="AutocompleteForm__key-value__value">
                            <label>
                                Значение
                                <input valueLink={this.linkState('newValue')} type="text" name="value" className="AutocompleteForm__key-value__input" />
                            </label>
                        </div>
                        <div className="AutocompleteForm__key-value__save-button">
                            <button onClick={this.onClick} type="submit" className="btn btn__primary AutocompleteForm__key-value__btn">
                                Сохранить
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    },
});