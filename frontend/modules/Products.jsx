/** @jsx React.DOM */
let React = require('react/addons');
import StoreItem from './StoreItem.jsx'

export default React.createClass({
    prepareProducts() {
        return this.props.data.map((product) => {
            return <StoreItem key={product.get('_id')} data={product} />
        });
    },
    render() {
        return(
            <div className="Products">
                {this.prepareProducts()}
            </div>
        );
    },
});