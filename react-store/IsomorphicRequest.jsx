let React = require('react/addons');

class IsomorphicRequest {
    constructor(req = null, res = null, router) {
        this.request = req;
        this.response = res;
        this.prefix = router.getPrefix();
        this._router = router;
        this.done = false;
        this.ended = false;
        this.params = {};

        this.initPath();
    }

    initPath() {
        if (this.request) {
            this._path = this.request.path;
            this.query = this.request.query;
        } else {
            this._path = window.location.pathname.slice(this.prefix.length);
            this.query = window.location.search;
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
        this.response.status(200).send(html);
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
        return {};
    }

    get query() {
        this._query;
    }

    set query(query) {
        if (typeof query === 'string') {
            query = this.parseQuery(query);
        }

        thiq._query = {};//query;
    }

    error(code = 500, {message = '', data = {}}, realError) {
        let error = new Error(`${code} ${message}`);
        error.data = data;
        error.code = code;

        console.log('implement error pages');
        this.timeEnd = Date.now();
        this.done = true;
        if (this.response) {
            return this.response.status(code).send(error);
        }
    }
}

export default IsomorphicRequest;