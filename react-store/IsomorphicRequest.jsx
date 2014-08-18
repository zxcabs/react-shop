let React = require('react/addons');
let querystring = require('querystring');

class IsomorphicRequest {
    constructor(req = null, res = null, router) {
        this.request = req;
        this.response = res;
        this.prefix = router.getPrefix();
        this._router = router;
        this.done = false;
        this.ended = false;

        this.initPath();
    }

    get params() {
        return this._params || {
            toString() {
                return JSON.stringify(this);
            }
        };
    }

    set params(value) {
        value.toString = function() {
            return JSON.stringify(this);
        }
        this._params = value;
    }

    initPath() {
        if (this.request) {
            this._path = this.request.path;
            this.query = this.request.query;
        } else {
            if (!this.prefix) {
                this.prefix = '/admin';
                console.log('implement!111');
            }
            let index = window.location.pathname.indexOf(this.prefix);
            let path = window.location.pathname;
            if (index === 0) {
                path = path.slice(this.prefix.length);
            }
            this._path = path
            console.log(this._path);
            this.query = window.location.search.slice(1);
        }
    }

    getPath() {
        return this._path;
    }

    render(View) {
        try {
            if (this.request) {
                this.renderToString(View);
            } else {
                this.renderToDOM(View);
            }
            this.done = true;
            this.timeEnd = Date.now();
        } catch (e) {
            this.error(500, {message: 'Render error'}, e)
            if (!this.request) {
                setTimeout(() => {
                    throw e;
                }, 1);
            }
        }
    }

    renderToString(View) {
        let html = React.renderComponentToString(View);
        console.log('clean this hack out');
        let json = ` models-json="${JSON.stringify(this.models).replace('"', '\\"')}"`;
        html = html.slice(0, 5) + json + html.slice(5);
        this.response.status(200).send('<!DOCTYPE html>' + html);
    }

    renderToDOM(View) {
        if (!this.ended) {
            React.renderComponent(View, document);
        }
    }

    end() {
        this.timeEnd = Date.now();
        this.ended = true;
    }

    is(request) {
        if (request === this) {
            return true;
        }
        if (request.getPath() !== this.getPath()) {
            return false;
        }
        return JSON.stringify(request.query) !== JSON.stringify(this.query);
    }

    parseQuery(string) {
        return querystring.parse(string);
    }

    get query() {
        return this._query || {};
    }

    set query(query) {
        if (typeof query === 'string') {
            query = this.parseQuery(query);
        }

        this._query = query;
    }

    error(code = 500, dataObj = {}, realError) {
        let error = new Error(`${code} ${dataObj.message || ''}`);
        error.data = dataObj.data || {};
        error.code = code;

        console.log('implement error pages', error);
        this.timeEnd = Date.now();
        this.done = true;
        if (this.response) {
            return this.response.status(code).send(error);
        }
    }
}

export default IsomorphicRequest;
