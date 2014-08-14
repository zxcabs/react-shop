/** @jsx React.DOM */
let React = require('react/addons');

export default React.createClass({
    render() {
        let item = this.props.item;
        let listScheme = this.props.dashboard.listScheme;
        let isSemi = item.get('status') !== 'active' && item.get('status') !== 'inactive';
        let statusClasses = React.addons.classSet({
            'DashboardItem__headline__info__label': true,
            'DashboardItem__headline__info__label--active': item.get('status') === 'active',
            'DashboardItem__headline__info__label--semi': isSemi,
            'DashboardItem__headline__info__label--inactive': item.get('status') === 'inactive'
        });

        let classes = React.addons.classSet({
            'DashboardItem': true,
            'DashboardItem--current': this.props.item === this.props.currentItem
        });

        let url = `/admin/${this.props.dashboardName}/${item.get('_id')}`;

        return (
            <a href={url} className={classes}>
                <span className="DashboardItem__image">
                {item.get('main_pic')
                    ? (<img className="DashboardItem__image__pic" src={item.get('main_pic')} />)
                    : null
                }
                </span>
                <div className="DashboardItem__headline">
                    <span className="DashboardItem__headline__link">
                        {item.get('name')}
                    </span>
                </div>
                <small className="DashboardItem__headline__info">
                    {listScheme.bottomLine ? (item.get(listScheme.bottomLine) || '') : ''}
                    <span className={statusClasses}>
                        {item.get('status')}
                    </span>
                </small>
            </a>
        );
    }
});
