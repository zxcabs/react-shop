/** @jsx React.DOM */
let React = require('react/addons');

export default React.createClass({
    render() {
        return(
            <div className="ProductGallery">
                <div className="ProductGallery__big">
                    <img src="" className="ProductGallery__big__image" />
                </div>
                <div className="ProductGallery__photo-list">
                    <a target="_blank" href="" className="ProductGallery__photo-list__item">
                        <img width="90" height="90" src="" className="ProductGallery__photo-list__item__image" />
                    </a>
                </div>
            </div>
        );
    },
});