/** @jsx React.DOM */
let React = require('react/addons');

export default React.createClass({
    prepareCategories() {
        return this.props.data.map((category) => {
            let url = '/category/' + category.get('_id');
            let child = category.get('childs').map((category) => {
            return(
                <li key={category.get('_id')} className="Categories__wrap__list__item">
                    <a href={url} className="Categories__wrap__list__item__link">
                        {category.get('name')}
                    </a>
                    <div className="Categories__wrap__list__item__hidden">
                        {child}
                    </div>
                </li>
            );
        });
    },
    render() {
        return(
            <div className="Categories">
                <div className="Categories__wrap">
                    <ul className="Categories__wrap__list">
                        {this.prepareCategories()}
                    </ul>
                </div>
            </div>
        );
    },
});
