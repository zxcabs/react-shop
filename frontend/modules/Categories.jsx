/** @jsx React.DOM */
let React = require('react/addons');

export default React.createClass({
    prepareCategories() {
        return this.props.data.map((category) => {
            return(
                <li key={category.get('_id')} className="Categories__wrap__list__item">
                    <a href="#"  className="Categories__wrap__list__item__link">
                        {category.get('name')}
                    </a>
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