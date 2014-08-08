/** @jsx React.DOM */
module React from 'react/addons';

let tabs = [
    {
        title: 'Основные',
        fields: ['attributes', 'name', 'price', 'type', 'mainImage', 'mainCategory']
    },

    {
        title: 'Изображения',
        fields: ['images']
    },

    {
        title: 'Категории',
        fields: ['categories']
    },

    {
        title: 'Наличие',
        fields: ['quantity', 'availability'],
    },
];

let fields = [
  {
    type: String,
    name: 'name',
    value: 'Название'
  },
  {
    type: Number,
    name: 'price',
    value: 'Цена'
  },
  {
    type: String,
    name: 'type',
    value: 'Тип товара'
  },
  {
    type: {
       id: String,
       value: String
    },
    name: 'main_category',
    value: {
       id: 'какойто айдишник категории',
       value: 'Название категории например тату машинки'
    }
  },
  {
    type: [{
        id: String,
        value: String
    }],
    name: 'categories',
    value: [{
        id: 'какойто айдишник категории',
        value: 'Название категории например тату машинки'
    }],
  },
  {
    type: [{
        id: String,
        name: String,
        value: String
    }],
    name: 'attributes',
    value: [{
        id: 'Айдишник типа аттрибута',
        name: 'Название аттрибута, например вес',
        value: '100'
    }]
  }
];

import AutocompleteForm from './AutocompleteForm.jsx'

let JustInput = React.createClass({
    render() {
        return(
            <label>
                <div>
                    {this.props.field.name}
                </div>
                <input autoComplete="off" type="text" name={this.props.field.name} />
            </label>
        );
    }
});

let views = {
    'attributes': AutocompleteForm,
    'name': JustInput,
    'price': JustInput,
    'type' : JustInput,
};

let Tab = React.createClass({
    renderViews() {
        return this.props.fields.map((field) => {
            let View = views[field.name];

            if (!View) {
                return null;
            }

            return <View field={field} />
        });
    },

    render() {
        return (
            <div className="Tab">
                {this.renderViews()}
            </div>
        );
    }
});

export default React.createClass({
    getInitialState() {
        return {
            tabs,
            fields,
            current : 0
        };
    },

    filterFields(tabDescriptor) {
        return this.state.fields.filter((field) => tabDescriptor.fields.indexOf(field.name) !== -1);
    },

    render() {
        let fields = this.filterFields(this.state.tabs[this.state.current]);
        return (
            <Tab fields={fields} />
        );
    }
});