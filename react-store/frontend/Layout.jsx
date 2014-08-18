/** @jsx React.DOM */
let React = require('react/addons');
import Header from './modules/Header.jsx'
import Categories from './modules/Categories.jsx'
import Footer from './modules/Footer.jsx'

export default React.createClass({
    handleRoutes(event) {
        if (event.target.href) {
            event.preventDefault();
            this.props.routeChange(event.target.href);
        }
    },

    render() {
        let Page = this.props.page;
        console.log(JSON.stringify(this.props.models));
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
                    <Page params={this.props.params} models={this.props.models} query={this.props.query} />
                    <Footer />
                    <script src="/vendor/traceur-runtime.js"></script>
                    <script src="/bundle/frontend.js"></script>
                </body>
            </html>
        );
    },
});