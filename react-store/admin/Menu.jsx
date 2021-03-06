/** @jsx React.DOM */
let React = require('react/addons');

export default React.createClass({
    getData() {
        let menuPoints = [{
            name : 'Товары',
            url : '/admin/Product',
            id : '1'
        },
        {
            name : 'Категории',
            url : '/admin/Category',
            id : '2'
        },
        {
            name : 'Заказы',
            url : '/admin/Order',
            id : '3'
        },
        {
            name : 'Страницы',
            url : '/admin/Page',
            id : '4'
        },
        {
            name : 'Корзина',
            url : '/admin/Bin',
            id : '5'
        }];

        return menuPoints.map((item) => {
            return (
                <li key={item.id} className="menu__nav__list__item">
                    <a className="menu__nav__list__item__link" href={item.url}>
                        {item.name}
                    </a>
                </li>
            );
        });
    },

    render() {
        return (
            <nav className="menu__nav">
                <ul className="menu__nav__list">
                    {this.getData()}
                </ul>
            </nav>
        );
    },
});