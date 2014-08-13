/** @jsx React.DOM */
let React = require('react/addons');

export default React.createClass({
    render() {
        return(
            <form action="" method="POST" className="ProductBuyForm">
                <table className="ProductBuyForm__table">
                    <tr>
                        <td className="ProductBuyForm__table__td__availability">
                            <span className="ProductBuyForm__table__availability ProductBuyForm__table__availability--not-available">
                                Нет в наличии.
                            </span>
                        </td>
                        <td className="ProductBuyForm__table__td__price-only">
                            <span className="ProductBuyForm__table__price">
                                1360 руб.
                            </span>
                        </td>
                        <td className="ProductBuyForm__table__td__price-and-availability">
                            <span className="ProductBuyForm__table__price">
                                3300 руб.
                            </span>
                            <span className="ProductBuyForm__table__availability">
                                В наличии
                            </span>
                        </td>
                        <td className="ProductBuyForm__table__td__quantity-select">
                            <select type="number" name="quantity" className="ProductBuyForm__table__quantity-select">
                                <option>1</option>
                                <option>2</option>
                            </select>
                        </td>
                        <td className="ProductBuyForm__table__td__buy-button">
                            <div className="ProductBuyForm__table__td__buy-button__container">
                                <input type="hidden" name="product_id" value="847" />
                                <input type="hidden" name="added_from" value="page" />
                                <input type="submit" value="В корзину" className="ProductBuyForm__table__buy-button" />
                                <span className="ProductBuyForm__table__buy-button__loader"></span>
                            </div>
                        </td>
                    </tr>
                </table>
            </form>
        );
    },
});