let React = require('react/addons');
import Products from './modules/Products.jsx'
import Panno from './modules/Panno.jsx'

export default React.createClass({
    render() {
        return (
            <section name="MainPage">
                <Panno />
                <Products data={this.props.models.ProductCollection} />
            </section>
        );
    }
});