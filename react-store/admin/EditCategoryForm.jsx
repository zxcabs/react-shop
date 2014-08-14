/** @jsx React.DOM */
module React from 'react/addons';

import CategoryTabController from './CategoryTabController.jsx'

export default React.createClass({
    getInitialState() {
        return {
            categoryStruct : [
                {
                    type : String,
                    name : 'name',
                    value : 'Название'
                },
                {
                    type : 'text',
                    name : 'description',
                    value : 'Описание'
                },
                {
                    type : 'radio',
                    name : 'is_parent',
                    value : 'Родительская'
                },
                {
                    type : String,
                    name : 'alias',
                    value : 'SEO URL'
                },
                {
                    type : String,
                    name : 'header',
                    value : 'Произвольный заголовок'
                },
                {
                    type : String,
                    name : 'type',
                    value : 'Тип товара'
                },
                {
                    type : 'text',
                    name : 'meta_title',
                    value : 'Meta Title'
                },
                {
                    type : 'text',
                    name : 'meta_description',
                    value : 'Meta Description'
                },
                {
                    type : 'text',
                    name : 'meta_keywords',
                    value : 'Meta Keywords'
                }
            ],

            tabs : '',
        };
    },

    render() {
        let structs = this.state.categoryStruct.map((struct) => {
            if (struct.type == String) {
                return(
                    <label>
                        <div>
                            {struct.value}
                        </div>
                        <input type="text" name={struct.name} />
                    </label>
                );
            } else if (struct.type == 'text') {
                return(
                    <label>
                        <div>
                            {struct.value}
                        </div>
                        <textarea cols="35" rows="10" name={struct.name} >
                        </textarea>
                    </label>
                );
            } else if (struct.type == 'radio') {
                return (
                    <label>
                        <input type="radio" name={struct.name} />
                        <div className="EditCategoryForm__form__radio-label">
                            {struct.value}
                        </div>
                    </label>
                );
            }
        });
        return(
            <div className="EditCategoryForm">
                <form className="EditCategoryForm__form">
                    <CategoryTabController fields={this.state.categoryStruct} />
                </form>
                <div className="EditCategoryForm__footer">
                    <button className="btn btn__primary">
                        Обновить категорию
                    </button>
                    <button className="btn">
                        Отменить
                    </button>
                </div>
            </div>
        );
    },
});