import IsomorphicRequest from './IsomorphicRequest.jsx';
let parserFunc = require('path-to-regexp');

class IsomorphicRouter {
    constructor(defaultUrl = '/') {
        this._errorViews = {};
        if (this.isOnClient()) {
            this.initOnClient();
        }
    }

    isOnClient() {
        return typeof window !== 'undefined';
    }

    handleRequest(req = null, res = null) {
        let request = new this.Request(req, res, this);
        this.check(request);
    }

    get Request() {
        return this._request || IsomorphicRequest;
    }

    set Request(request) {
        this._request = request;
    }

    initOnClient() {
        window.addEventListener('popstate', (event) => {
            this.run();
        }, false);
        document.body.addEventListener('click', (event) => {
            if (!event.target.href) {
                return;
            }
            if (event.altKey || event.ctrlKey || event.metaKey) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            this.routeChange(event.target.href);
            console.log('implement foreign url check');
        }, false);
        document.addEventListener('DOMContentLoaded', () => {
            this.handleRequest();
        });
    }

    routeChange(url) {
        window.history.pushState('', '', url);
        this.handleRequest();
    }

    setPrefix(prefix) {
        this._prefix = prefix;
    }

    getPrefix(prefix) {
        return this._prefix;
    }

    route(route, callback) {
        if (!this._routes) {
            this._routes = [];
        }

        let keys = [];
        let parser = parserFunc(route, keys);
        let parse = (path) => {
            let res = parser.exec(path);
            if (!res) {
                return null;
            }
            return res.slice(1).reduce((accum, item, index) => {
                if (item !== null && item !== undefined) {
                    accum[keys[index].name] = item;
                }
                return accum;
            }, {});
        };

        this._routes.push({
            parse,
            route,
            callback
        });
    }

    setRenderer(func) {
        this._render = func;
    }

    check(request) {
        if (this._render) {
            request.render = this._render;
        }
        let previousRequest = null;
        if (this.isOnClient()) {
            previousRequest = this.currentRequest || null;
        }
        for (let routeChecker of this._routes) {
            let params = routeChecker.parse(request.getPath());
            if (!params) {continue;}
            if (previousRequest) {
                if (!previousRequest.done) {
                    if (previousRequest.is(request) {
                        return;
                    } else {
                        previousRequest.end();
                    }
                } else {
                    if (previousRequest.is(request)) {
                        if (Date.now() - previousRequest.timeEnd < 100) {
                            return;
                        }
                    }
                }
            }
            request.params = params;
            if (this.isOnClient()) {
                this.currentRequest = request;
            }
            return routeChecker.callback.call(request, request);
        }

        request.error(404);
    }
}

export default IsomorphicRouter;
