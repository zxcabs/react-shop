/** @jsx React.DOM */
module React from 'react/addons';

export default React.createClass({
    getInitialState() {
        return {
            tabs : this.props.tabs,
            tabIndex : this.props.index
        };
    },

    changeIndex(event) {
        event.preventDefault();

        this.setState({
            tabIndex : this.index
        });
    },

    prepareLinks() {
        return this.state.tabs.map((tab) => {
            return (
                <li key={tab.fields} className="EditCategoryForm__controls__list__item">
                    <a href="#" className="EditCategoryForm__controls__list__item__link EditCategoryForm__controls__list__item__link--active" index={this.state.tabs.index} onClick={this.changeIndex}>
                        {tab.title}
                    </a>
                </li>
            );
        });
    },

    render() {
        return (
            <ul className="EditCategoryForm__controls__list">
                {this.prepareLinks()}
            </ul>
        );
    },
});