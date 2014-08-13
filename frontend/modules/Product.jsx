/** @jsx React.DOM */
let React = require('react/addons');
import StoreItem from './StoreItem.jsx'
import ProductGallery from './ProductGallery.jsx'
import ProductBuyForm from './ProductBuyForm.jsx'
import ProductTabs from './ProductTabs.jsx'

export default React.createClass({
    render() {
        return(
            <div className="Product">
                <div className="Product__top">
                    <div className="Product__top__left">
                        <ProductGallery />
                    </div>
                    <div className="Product__top__right">
                        <span className="Product__top__right__small-description">
                            Модель здесь!
                        </span>
                        <span className="Product__top__right__title">
                            {this.props.model.get('name')}
                        </span>
                        <ProductBuyForm data={this.props.model} />
                        <ProductTabs text={this.props.model.get('description')} attrs={this.props.model.get('attributes')} />
                    </div>
                </div>
            </div>
        );
    },
});