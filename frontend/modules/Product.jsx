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
                            Роторная тату машинка
                        </span>
                        <span className="Product__top__right__title">
                            Dragonfly V1 Blue
                        </span>
                        <ProductBuyForm />
                        <ProductTabs />
                    </div>
                </div>
            </div>
        );
    },
});