const miniExpress = require("./framework/app");
const app = new miniExpress()
const routes = require("./routes");
const middlewares = require("./middlewares");

const port = process.env.PORT || 3000;

middlewares(app);
routes(app);

app.listen(3000, () => console.log(`server started on port ${port}`));