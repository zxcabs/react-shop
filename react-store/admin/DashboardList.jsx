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

    renderHeadingTools() {
        return(
            <form className="DashboardListHeading">
                <div className="DashboardListHeading__container">
                    <input type="text" className="DashboardListHeading__search-input" name="search" value="" placeholder="Поиск" autoComplete="off" maxLength="50" />
                    <div className="DashboardListHeading__actions">
                        <a className="btn btn__primary" href="#">
                            Все
                        </a>
                    </div>
                </div>
            </form>
        );
    },

    render() {
        return (
            <div className="DashboardList">
                {this.renderHeadingTools()}
                <div className="DashboardList__list">
                    {this.renderItems()}
                </div>
            </div>
        );
    },
});