/** @jsx React.DOM */
let React = require('react/addons');

import Menu from './Menu.jsx'
import DashboardList from './DashboardList.jsx'
import CreateProduct from './CreateProduct.jsx'

let dashboards = {
    Category: {
        listScheme: {
            bottomLine: 'parent.name'
        }
    }
};

export default React.createClass({
    render() {
        let dashboardName = this.props.params.dashboard;
        let dashboard = dashboards[this.props.params.dashboard];

        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width" />
                    <title>
                        Manager System Proto
                    </title>
                    <script src="/vendor/traceur-runtime.js"></script>
                    <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.min.css" />
                    <link href='http://fonts.googleapis.com/css?family=PT+Serif:400,700,400italic,700italic&subset=latin,cyrillic,latin-ext,cyrillic-ext' rel='stylesheet' type='text/css' />
                    <link href="//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.1/normalize.min.css" rel="stylesheet" />
                    <link href="/css/app.css" rel="stylesheet" />
                </head>
                <body>
                    <div className="menu">
                        <Menu />
                    </div>
                    <div className="content">
                        <div className="content__list">
                            <DashboardList
                                dashboard={dashboard}
                                dashboardName={dashboardName}
                                collection={this.props.models[`${dashboardName}Collection`]}
                            />
                        </div>
                        <div className="content__current-operation">
                        </div>
                    </div>
                    <script id="initialData" type="text/json">
                        {JSON.stringify(this.props.models)}
                    </script>
                </body>
            </html>
        );
    }
});