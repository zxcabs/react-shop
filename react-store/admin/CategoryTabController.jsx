/** @jsx React.DOM */
let React = require('react/addons');

import CategoryTabControllerTabLinks from './CategoryTabControllerTabLinks.jsx'

let categoryTabs = [
    {
        index : 0,
        title : 'Основные',
        fields : ['name', 'description', 'is_parent']
    },
    {
        index : 1,
        title : 'SEO',
        fields : ['alias', 'header', 'type', 'meta_title','meta_description', 'meta_keywords']
    }
];

let TextField = React.createClass({
    render() {
        return (
            <label>
                <div>
                    {this.props.field.value}
                </div>
                <textarea cols="35" rows="10" name={this.props.field.name} >
                </textarea>
            </label>
        );
    },
});

let GeneralInput = React.createClass({
    render() {
        return (
            <label>
                <div>
                    {this.props.field.value}
                </div>
                <input type="text" name={this.props.field.name} />
            </label>
        );
    },
});

let RadioInput = React.createClass({
    render() {
        return (
            <label>
                <input type="radio" name={this.props.field.name} />
                <div className="EditCategoryForm__form__radio-label">
                    {this.props.field.value}
                </div>
            </label>
        );
    }
});

let views = {
    'name': GeneralInput,
    'description': TextField,
    'is_parent': RadioInput,
    'alias': GeneralInput,
    'header': GeneralInput,
    'type': GeneralInput,
    'meta_title': TextField,
    'meta_description': TextField,
    'meta_keywords': TextField
};

let CategoryTab = React.createClass({
    renderViews() {
        return this.props.fields.map((field) => {
            let CategoryView = views[field.name];

            if (!CategoryView) {
                return null;
            }

            return <CategoryView field={field} />
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
            categoryTabs,
            fields : this.props.fields,
            currentTab : 0
        };
    },

    filterCategoryFields(tabDescriptor) {
        return this.state.fields.filter((field) => tabDescriptor.fields.indexOf(field.name) !== -1);
    },

    render() {
        let catFields = this.filterCategoryFields(this.state.categoryTabs[this.state.currentTab]);
        return (
            <div>
                <div className="EditCategoryForm__controls">
                    <CategoryTabControllerTabLinks tabs={this.state.categoryTabs} index={this.state.currentTab}/>
                </div>
                <CategoryTab fields={catFields} />
            </div>
        );
    },
});