/** @jsx React.DOM */
let React = require('react/addons');
if (typeof window !== 'undefined') {
    window.React = React;
}
import Menu from './Menu.jsx'
import DashboardList from './DashboardList.jsx'
import DashboardCreateItem from './DashboardCreateItem.jsx'
import JustInput from './JustInput.jsx'
import JustSelect from './JustSelect.jsx'
import MarkdownTextarea from './MarkdownTextarea.jsx'
import AutocompleteInput from './AutocompleteInput.jsx'

let dashboards = {
    Category: {
        listScheme: {
            bottomLine: 'parent.name'
        },
        fields: {
            name: JustInput,
            description: MarkdownTextarea,
            parent: AutocompleteInput,
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
            mainCategory: AutocompleteInput,
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
    handleRoutes(event) {
        if (event.target.href) {
            event.preventDefault();
            this.props.routeChange(event.target.href);
        }
    },

    renderTabs() {
        let dashboardName = this.props.params.dashboard;
        let dashboard = dashboards[this.props.params.dashboard];

        let tabs = [
            (<div key="1" className="content__list">
                <DashboardList
                    dashboard={dashboard}
                    dashboardName={dashboardName}
                    collection={this.props.models[`${dashboardName}Collection`]}
                />
            </div>),
            (<div key="2" className="content__current-operation">
                {this.props.params.id
                    ? (<DashboardCreateItem
                        key={dashboardName + this.props.params.id}
                        tab={this.props.params.tab || 0}
                        dashboard={dashboard}
                        modelName={dashboardName}
                        requestParentUpdate={this.forceUpdate.bind(this)}
                        model={this.props.models[dashboardName]}
                    />) : null}
            </div>)
        ];

        return tabs;
    },

    render() {
        let isInitialRender = !!this.notInitialRender;
        if (typeof window !== 'undefined') {
            window.asd = this.props.models;
        }
        this.notInitialRender = true;
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
                <body onClick={this.handleRoutes}>
                    <div className="menu">
                        <Menu />
                    </div>
                    <div className="content">
                        {this.renderTabs()}
                    </div>
                    <input readOnly="true" value={JSON.stringify(this.props.models)} style={{display: 'none'}} id="initialData"/>
                    <script src="/vendor/traceur-runtime.js"></script>
                    <script src="/bundle/app.js"></script>
                </body>
            </html>
        );
    }
});