/** @jsx React.DOM */
let React = require('react/addons');
import ProductGallery from './modules/ProductGallery.jsx'
import ProductBuyForm from './modules/ProductBuyForm.jsx'
import ProductTabs from './modules/ProductTabs.jsx'

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
                            {this.props.models.Product.get('name')}
                        </span>
                        <ProductBuyForm data={this.props.models.Product} />
                        <ProductTabs text={this.props.models.Product.get('description')} attrs={this.props.models.Product.get('attributes')} />
                    </div>
                </div>
            </div>
        );
    },
});