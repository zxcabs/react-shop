/** @jsx React.DOM */
let React = require('react/addons');
import Header from './modules/Header.jsx'
import Categories from './modules/Categories.jsx'
import CartBody from './modules/CartBody.jsx'

export default React.createClass({
    render() {
        return(
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width" />
                    <title>
                        Manager System Proto
                    </title>
                    <script src="/vendor/traceur-runtime.js"></script>
                    <link href="http://fonts.googleapis.com/css?family=PT+Sans|Roboto+Condensed&amp;subset=latin,cyrillic,latin-ext" rel="stylesheet" type="text/css" />
                    <link href="/css/app.css" rel="stylesheet" />
                </head>
                <body>
                    <Header />
                    <Categories data={this.props.models.CategoryCollection} />
                    <CartBody />
                </body>
            </html>
        );
    },
});