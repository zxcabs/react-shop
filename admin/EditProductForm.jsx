/** @jsx React.DOM */
module React from 'react/addons';

import AutocompleteForm from './AutocompleteForm.jsx'
import TabController from './TabController.jsx'

export default React.createClass({
    render() {
        return (
            <div className="EditProductForm">
                <div className="EditProductForm__controls">
                    <ul className="EditProductForm__controls__list">
                        <li className="EditProductForm__controls__list__item">
                            <a href="#" className="EditProductForm__controls__list__item__link EditProductForm__controls__list__item__link--active" data-pane="base">
                                Основные
                            </a>
                        </li>
                        <li className="EditProductForm__controls__list__item">
                            <a href="#" className="EditProductForm__controls__list__item__link" data-pane="images">
                                Изображения
                            </a>
                        </li>
                        <li className="EditProductForm__controls__list__item">
                            <a href="#" className="EditProductForm__controls__list__item__link" data-pane="categories">
                                Категории
                            </a>
                        </li>
                        <li className="EditProductForm__controls__list__item">
                            <a href="#" className="EditProductForm__controls__list__item__link" data-pane="stock">
                                Наличие
                            </a>
                        </li>
                    </ul>
                </div>
                <TabController />
                <div className="formTemplate">
                    <AutocompleteForm />
                </div>
                <form className="EditProductForm">
                    <div className="EditProductForm__tab EditProductForm__tab--active">
                        <div className="EditProductForm__row">
                            <div className="EditProductForm__row__left">
                                <label>
                                    Название
                                </label>
                                <input className="EditProductForm__label__input" type="text" name="name" placeholder="Название" />
                                <label>
                                    Цена
                                </label>
                                <input className="EditProductForm__label__input" type="text" name="price" placeholder="Цена" />
                                <label>
                                    Тип продукта
                                </label>
                                <input className="EditProductForm__label__input" type="text" name="model" placeholder="Тип продукта" />
                            </div>
                            <div className="EditProductForm__row__right">
                                <label>
                                    Изображение
                                </label>
                                <div className="EditProductForm__image-input">
                                    <span className="EditProductForm__image-input__note">
                                        Перетащите файлы сюда
                                    </span>
                                    <input type="file" className="EditProductForm__image-input__hidden-input" name="default" />
                                    <output id="list"></output>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="EditProductForm__footer">
                    <button className="btn btn__primary" onClick={this.onClick} type="submit">
                        Сохранить
                    </button>
                    <button className="btn" onClick={this.onClick} type="submit">
                        Закрыть
                    </button>
                </div>
            </div>
        );
    },
});

/**

*/