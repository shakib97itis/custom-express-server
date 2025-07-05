const http = require('http');

class App {
    constructor() {
        this.middlewares = [];
        this.routes = [];
    }

    get(path, callback) {
        this.routes.push({ method: 'GET', path, callback });
    }

    post(path, callback) {
        this.routes.push({ method: 'POST', path, callback });
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    executeMiddleware(req, res) {
        const dispatch = (i = 0) => {
            if (i >= this.middlewares.length) return Promise.resolve();

            const singleMw = this.middlewares[i];

            return new Promise((resolve) => {
                singleMw(req, res, () => {
                    resolve(dispatch(i + 1));
                });
            });
        };

        dispatch(0);
    }

    executeRoute(req, res) {
        const route = this.routes.find((route) => {
            return route.method === req.method && route.path === req.url;
        })

        if (route) {
            route.callback(req, res);
        } else {
            res.writeHead(404, {
                'content-type': 'text/plain'
            });
            res.end('Route Not Found');
        }
    }

    listen(port, callback) {
        const server = http.createServer(async (req, res) => {
           
            await this.executeMiddleware(req, res);

            this.executeRoute(req, res);
        });

        server.listen(port, callback);
    }
}

module.exports = App;