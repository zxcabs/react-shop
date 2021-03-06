import EndPoint from './EndPoint.jsx';

export default class DataEndPoint extends EndPoint {
    _create(req, res) {
        let model = req.models[req.params.relModel || req.params.model];
        for (let key in req.body) {
            if (!req.body.hasOwnProperty(key)) {continue;}
            if (!req.body[key]) {
                let res = model.get(key);
                if (!res) {continue;}
                if (Array.isArray(res) && !res.length) {continue;}
            }
            model.set(key, req.body[key]);
        }
        model.save(req.query).then(() => {
            res.send({
                result: {
                    models: req.models
                }
            });
        }).catch((err) => res.status(500).send(err));
    }

    _read(req, res) {
        res.status(200).send({
            result: {
                models: req.models
            }
        });
    }

    _update(...args) {
        this._create(...args);
    }

    _delete(req, res) {
        let model = req.models[req.params.relModel || req.params.model];
        model.remove(() => res.status(200).send());
    }

    mountEndPoints() {
        this.router.param('model', (req, res, next) => {
            if (!req.models) {
                req.models = {};
            }
            let User = req.user;
            this.server.loadModel(req.method, req.params.model, req.params.modelId, req.models, req.query, User)
            .then(() => next()).catch((error) => {
                console.log(error);
                res.status(404 || 403 || 500).end(error);
            });
        });
        this.router.param('relModel', (req, res, next) => {
            let User = req.user;
            this.server.loadModels(req.method, req.params.relModel, req.params.relModelId, req.models, req.query, User)
            .then(() => next()).catch((error) => {
                res.status(error.code || error.message || 404 || 403 || 500).end(error);
            });
        });

        let route = this.route('/:model/:modelId?/:relModel?/:relModelId?');
        route.post((...args) => this._create(...args));
        route.get((...args) => this._read(...args));
        route.put((...args) => this._update(...args));
        route.delete((...args) => this._delete(...args));
    }
}