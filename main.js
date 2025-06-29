const miniExpress = require("./mini-express/functional-app");
const app = miniExpress();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    console.log("Middleware 1 executed", req.url);
    next();
});

app.use((req, res, next) => {
    console.log("Middleware 2 executed", req.url);
    next();
});

app.get('/', (req, res) => res.end('hello world | get | Home Page'));

app.get('/user', (req, res) => res.end('hello user | get | User Page'));

app.listen(port, () => console.log(`server started on port ${port}`));