/** @jsx React.DOM */
module React from 'react/addons';

export default React.createClass({
    getInitialState() {
        return {
            category : [{
                type : String,
                name : 'name',
                value : 'Название'
            }, {
                type : 'text',
                name : 'description',
                value : 'Описание'
            }]
        };
    },

    render() {
        let fields = this.state.category.map((field) => {
            if (field.type == 'text') {
                return (
                    <label>
                        <div>
                            {field.value}
                        </div>
                        <textarea cols="35" rows="10" name={field.name}>
                        </textarea>
                    </label>
                );
            } else {
                return (
                    <label>
                        <div>
                            {field.value}
                        </div>
                        <input type="text" name={field.name} />
                    </label>
                );
            }
        });

        return (
            <div className="CreateCategoryForm">
                <form className="CreateCategoryForm__form">
                    {fields}
                </form>
                <div className="CreateCategoryForm__footer">
                    <button className="btn btn__primary">
                        Создать категорию
                    </button>
                </div>
            </div>
        );
    },
});