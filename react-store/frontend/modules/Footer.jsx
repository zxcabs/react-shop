/** @jsx React.DOM */
let React = require('react/addons');

export default React.createClass({
    render() {
        return(
            <footer className="Footer">
                <div className="Footer__top">
                    <div className="Footer__top__email">
                        <a href="mailto:help@harrys.com" className="Footer__top__email__link" title="help@harrys.com">
                            <img alt="Email" src="https://harrys.exceda.com/assets/footer/email-867e569b67e412ae90f0fe62c0768baa.png" />
                            <span>help@harrys.com</span>
                        </a>
                    </div>
                    <div className="Footer__top__email">
                        <a href="mailto:help@harrys.com" className="Footer__top__email__link" title="help@harrys.com">
                            <img alt="Phone" src="https://harrys.exceda.com/assets/footer/phone-a4975f6ef7126e1b5a668bab77586a9a.png" />
                            <span>888 212 6855</span>
                        </a>
                    </div>
                    <div className="Footer__top__social">
                        <a href="http://facebook.com/hapostrophe" className="facebook" title="Facebook" target="_blank">
                            <img alt="Facebook" src="https://harrys.exceda.com/assets/footer/facebook-685ce937b70684ff44afb33632b4d807.png" />
                        </a>
                        <a href="http://twitter.com/harrys" className="twitter" title="Twitter" target="_blank">
                            <img alt="Twitter" src="https://harrys.exceda.com/assets/footer/twitter-b8bf0be18cf7b4707b80f4a98a8dcb45.png" />
                        </a>
                        <a href="http://instagram.com/harrys" className="instagram" title="Instagram" target="_blank">
                            <img alt="Instagram" src="https://harrys.exceda.com/assets/footer/instagram-e71df072c43c4f9786a342c79ccaa2cf.png" />
                        </a>
                        <a href="https://plus.google.com/108449012437955146892/" className="googleplus" title="Google+" rel="publisher" target="_blank">
                            <img alt="Googleplus" src="https://harrys.exceda.com/assets/footer/googleplus-36cf9c18dfc11118046d599cc1300f72.png" />
                        </a>
                    </div>
                </div>
                <div className="Footer__bottom">
                    <p className="Footer__bottom__left">
                        © Supply Club. Все права защищены. 2014
                    </p>
                    <a href="/about" className="Footer__bottom__link">
                        О магазине
                    </a>
                    <a href="/warranty" className="Footer__bottom__link">
                        Гарантия
                    </a>
                    <a href="/mobile" className="Footer__bottom__link">
                        Версия для смартфонов
                    </a>
                </div>
            </footer>
        );
    },
});