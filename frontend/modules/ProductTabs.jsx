/** @jsx React.DOM */
let React = require('react/addons');

export default React.createClass({
    render() {
        return(
            <div className="ProductTabs">
                <span data-index="0" className="ProductTabs__tab ProductTabs__tab--active">
                    Описание
                </span>
                <span data-index="1" className="ProductTabs__tab">
                    Характеристики
                </span>
                <div className="ProductTabs__info ProductTabs__info--active">
                    <p>Эргономичный дизайн и современные технические решения обеспечили головокружительный успех этой модели татуировочной машинки.</p>
                    <ul>
                        <li>Алюминиевая тату машинка.</li>
                        <li>Может быть использована в качестве лайнера (Liner) и шедера (Shader).</li>
                        <li>Ультра легкий вес - 80 гр.</li>
                        <li>Низкий уровень шума.</li>
                        <li>Простая регулировка силы удара</li>
                        <li>Работает со стандартными иглами, грифами и источниками питания</li>
                        <li>Рабочее напряжение(V):0-14.</li>
                    </ul>
                </div>
                <div className="ProductTabs__info">
                    <div className="ProductTabs__info__options-item">
                        <div className="ProductTabs__info__options-item__name__block">
                            <span className="ProductTabs__info__options-item__name">
                                Вес
                            </span>
                        </div>
                        <div className="ProductTabs__info__options-item__value__block">
                            <span className="ProductTabs__info__options-item__value">
                                80 г.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});