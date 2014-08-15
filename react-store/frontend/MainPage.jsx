/** @jsx React.DOM */
let React = require('react/addons');
import Layout from './frontend/Layout.jsx'
import Products from './modules/Products.jsx'
import Panno from './modules/Panno.jsx'
import Welcome from './modules/Welcome.jsx'
import Selections from './modules/Selections.jsx'

export default React.createClass({
    render() {
        return (
            <section name="MainPage">
                <Panno />
                <Selections />
                <Products data={this.props.models.ProductCollection} />
                <Welcome />
            </section>
        );
    }
});