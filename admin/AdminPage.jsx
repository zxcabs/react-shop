/** @jsx React.DOM */
let React = require('react/addons');

import Menu from './Menu.jsx'
import DashboardList from './DashboardList.jsx'
import DashboardCreateItem from './DashboardCreateItem.jsx'
import JustInput from './JustInput.jsx'
import JustSelect from './JustSelect.jsx'
import MarkdownTextarea from './MarkdownTextarea.jsx'

let dashboards = {
    Category: {
        listScheme: {
            bottomLine: 'parent.name'
        },
        fields: {
            name: JustInput,
            description: MarkdownTextarea,
            parent: JustInput,
            status: JustSelect
        },
        layout: [{
            name: 'main',
            fields: ['name', 'description', 'parent', 'status']
        }]
    },
    Product: {
        listScheme: {
            bottomLine: 'price'
        },
        fields: {
            name: JustInput,
            price: JustInput,
            mainCategory: JustInput,
            status: JustSelect
        },
        layout: [{
            name: 'main',
            fields: ['name', 'price', 'mainCategory', 'status']
        }, {
            name: 'images',
            fields: []
        }, {
            name: 'categories',
            fields: ['mainCategory', 'categories']
        }, {
            name: 'availability',
            fields: ['status']
        }]
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
                            {this.props.params.id
                                ? (<DashboardCreateItem
                                    key={dashboardName + this.props.params.id}
                                    tab={this.props.params.tab || 0}
                                    dashboard={dashboard}
                                    modelName={dashboardName}
                                    model={this.props.models[dashboardName]}
                                />) : null}
                        </div>
                    </div>
                    <div style={{display: 'none'}} id="initialData">
                        {JSON.stringify(this.props.models)}
                    </div>
                    <script src="/vendor/traceur-runtime.js"></script>
                    <script src="/bundle/app.js"></script>
                </body>
            </html>
        );
    }
});