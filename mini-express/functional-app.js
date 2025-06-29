const http = require('http');

function App() {
    const routes = [];
    const middlewares = [];

    const use = (middleware) => {
        middlewares.push(middleware);
    }

    function get(path, callback) {
        routes.push({ method: 'GET', path, callback });
    }

    function post(path, callback) {
        routes.push({ method: 'POST', path, callback });
    }

    function executeMiddleware(req, res) {
        const dispatch = (i = 0) => {
            if (i >= middlewares.length) return Promise.resolve();

            const singleMw = middlewares[i];

            return new Promise((resolve, reject) => {
                singleMw(req, res, () => {
                    resolve(dispatch(i + 1));
                });
            });
        };

        return dispatch(0);
    }

    function executeRoute(req, res) {
        const route = routes.find((route) => {
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

    function listen(port, callback) {
        const server = http.createServer(async (req, res) => {
            await executeMiddleware(req, res);
            executeRoute(req, res);
        });

        server.listen(port, callback);
    }

    return { get, post, use, listen };
}

module.exports = App;