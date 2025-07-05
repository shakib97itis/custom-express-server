function middlewares(app) {
    app.use((req, res, next) => {
        console.log("Middleware 1 executed", req.url);
        console.log(app)
        next()
    });

    app.use((req, res, next) => {
        console.log("Middleware 2 executed", req.url);
        next();
    });
}

module.exports = middlewares