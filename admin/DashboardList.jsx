/** @jsx React.DOM */
module React from 'react/addons';
import DashboardItem from './DashboardItem.jsx';

export default React.createClass({
    renderItems() {
        return this.props.models.CategoryCollection.map((item) => {
            return (<DashboardItem
                        dashboard={this.props.dashboard}
                        key={item.get('_id')}
                        item={item}
                    />);
        });
    },

    render() {
        return (
            <div className="DashboardList">
                <h1 className="DashboardList__heading">
                    Список
                </h1>
                <ul className="DashboardList__list">
                    {this.renderItems()}
                </ul>
            </div>
        );
    },
});