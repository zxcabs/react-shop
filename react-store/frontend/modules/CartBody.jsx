/** @jsx React.DOM */
let React = require('react/addons');

export default React.createClass({
    renderTableHeading() {
        return(
            <thead className="CartTHeading">
                <tr>
                    <td className="CartBodyTable__image">
                    </td>
                    <td className="CartBodyTable__name">
                        Наименование
                    </td>
                    <td className="CartBodyTable__quant-sel">
                        Количество
                    </td>
                    <td className="CartBodyTable__price">
                        Сумма
                    </td>
                    <td></td>
                </tr>
            </thead>
        );
    },
    renderCartElement() {
        return(
            <tr className="CartElement">
                <td className="CartBodyTable__image">
                    <a target="_blank" href="http://supplyclub.ru/tattoo-machines/rotary/bishop-rotary-red-rca">
                        <img width="60" height="60" src="" />
                    </a>
                </td>
                <td className="CartBodyTable__name">
                    <a href="http://supplyclub.ru/tattoo-machines/rotary/bishop-rotary-red-rca" className="CartElement__link">
                        Bishop Rotary Red RCA
                    </a>
                </td>
                <td className="CartBodyTable__quant-sel">
                    <select className="CartElement__quant-sel">
                        <option>1</option>
                        <option>2</option>
                    </select>
                </td>
                <td className="CartBodyTable__price">
                    <span className="CartElement__price">
                        3300 руб.
                    </span>
                </td>
                <td>
                    <form action="#" method="POST">
                        <label className="CartElement__delete-label">
                            <input className="CartElement__delete-label__hidden-input" type="submit" value="Удалить" />
                            <span className="CartElement__delete-label__fake-tapper">
                            </span>
                        </label>
                        <input type="hidden" name="key" value="847" />
                    </form>
                </td>
            </tr>
        );
    },
    renderCartButtons() {
        return(
            <div className="CartButtons">
                <a className="CartButtons__item StoreButton">
                    Быстрый заказ
                </a>
                <a className="CartButtons__item StoreButton">
                    Оформить заказ
                </a>
            </div>
        );
    },
    render() {
        return(
            <div className="CartBody">

                <span className="CartBody__heading">
                    Корзина
                </span>

                <table className="CartBodyTable">
                    {this.renderTableHeading()}
                    <tbody>
                        {this.renderCartElement()}
                    </tbody>
                </table>

                <span className="CartBody__total">
                    Товаров выбрано на сумму: 3300 руб.
                </span>

                {this.renderCartButtons()}

            </div>
        );
    },
});