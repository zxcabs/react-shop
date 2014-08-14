/** @jsx React.DOM */
let React = require('react/addons');
import DashboardItem from './DashboardItem.jsx';

export default React.createClass({
    renderItems() {
        return this.props.collection.map((item) => {
            return (
            <DashboardItem
                dashboard={this.props.dashboard}
                currentItem={this.props.currentItem}
                dashboardName={this.props.dashboardName}
                key={item.get('_id')}
                item={item}
            />
            );
        });
    },

    render() {
        return (
            <div className="DashboardList">
                <h1 className="DashboardList__heading">
                    Список
                </h1>
                <div className="DashboardList__list">
                    {this.renderItems()}
                </div>
            </div>
        );
    },
});