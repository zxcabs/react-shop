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
            bottomLine: 'description'
        },
        fields: {
            name: JustInput,
            description: MarkdownTextarea,
            childs: AutocompleteInput,
            status: JustSelect
        },
        layout: [{
            name: 'main',
            fields: ['name', 'description', 'childs', 'status']
        }]
    },
    Product: {
        listScheme: {
            bottomLine: 'price'
        },
        fields: {
            name: JustInput,
            price: JustInput,
            description: MarkdownTextarea,
            mainCategory: AutocompleteInput,
            categories: AutocompleteInput,
            status: JustSelect
        },
        layout: [{
            name: 'main',
            fields: ['name', 'price', 'description', 'mainCategory', 'status']
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
    requestParentUpdate(item = null) {
        if (item) {
            this.props.models[this.props.params.dashboard + 'Collection'].unshift(item);
        }
        this.forceUpdate();
    },

    renderTabs() {
        let dashboardName = this.props.params.dashboard;
        let dashboard = dashboards[this.props.params.dashboard];

        let tabs = [
            (<div key="1" className="content__list">
                <DashboardList
                    dashboard={dashboard}
                    dashboardName={dashboardName}
                    currentItem={this.props.models[dashboardName]}
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
                        requestParentUpdate={this.requestParentUpdate}
                        model={this.props.models[dashboardName]}
                    />) : null}
            </div>)
        ];

        return tabs;
    },

    render() {
        if (typeof window !== 'undefined') {
            window.asd = this.props.models;
        }
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width" />
                    <title>
                        Manager System Proto
                    </title>
                    <link href='http://fonts.googleapis.com/css?family=PT+Serif:400,700,400italic,700italic&subset=latin,cyrillic,latin-ext,cyrillic-ext' rel='stylesheet' type='text/css' />
                    <link href="/css/app.css" rel="stylesheet" />
                </head>
                <body>
                    <div className="menu">
                        <Menu />
                    </div>
                    <div className="content">
                        {this.renderTabs()}
                    </div>
                    <script src="/vendor/traceur-runtime.js"></script>
                    <script src="/bundle/app.js"></script>
                </body>
            </html>
        );
    }
});