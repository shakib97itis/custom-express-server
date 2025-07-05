function routes(app) {
    app.get('/', (req, res) => res.end('hello world | get | Home Page'));

    app.get('/user', (req, res) => res.end('hello user | get | User Page'));

    app.post('/myself', (req, res) => res.end('hello user | post | User Page'));
}

module.exports = routes