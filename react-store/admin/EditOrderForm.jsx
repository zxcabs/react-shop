/** @jsx React.DOM */
module React from 'react/addons';

let newOrder = [
    {
        type : Number,
        name : 'id',
        value : 'ID'
    },
    {
        type : String,
        name : 'first_name',
        value : 'Имя'
    },
    {
        type: Number,
        name : 'telephone',
        value : 'Номер телефона'
    },
    {
        type: String,
        name : 'email',
        value : 'Адрес E-mail'
    },
    {
        type : String,
        name : 'last_name',
        value : 'Фамилия'
    },
    {
        type : String,
        name : 'region',
        value :  'Область / Край / Республика'
    },
    {
        type : String,
        name : 'city',
        value : 'Населеннный пункт'
    },
    {
        type : String,
        name : 'address',
        value : 'Адрес'
    },
    {
        type : String,
        name : 'status',
        value : 'Статус'
    }
];

export default React.createClass({
    prepareNewOrder() {
        return newOrder.map((field) => {
            return(
                <label>
                    <div>
                        {field.value}
                    </div>
                    <input type="text" name={field.name} />
                </label>
            );
        });
    },
    render() {
        return(
           <div className="EditOrderForm">
                <form className="EditOrderForm__form">
                    {this.prepareNewOrder()}
                </form>
                <div className="EditOrderForm__footer">
                    <button className="btn btn__primary">
                        Сохранить
                    </button>
                    <button className="btn">
                        Отмена
                    </button>
                </div>
            </div>
        );
    },
});