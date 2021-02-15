"use strict";

require("reflect-metadata");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _typeorm = require("typeorm");

var _UserRepository = require("./repositories/UserRepository");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { userRouter } from "./routes/UserRoutes";

var app = (0, _express2.default)();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var userRouter = require("./routes/UserRoutes");
var productRouter = require("./routes/ProductRoutes");

var connection = (0, _typeorm.createConnection)().then(console.log('-- Connection established')).catch(function (error) {
    return console.error(error);
});

app.get('/', function (req, res) {
    res.send("En ruta principal de la app");
});

// we get user routes
app.use('/', userRouter);
// we get product routes
app.use('/', productRouter);

app.listen(3000, function () {
    try {
        console.log('-- Ready on port 3000!');
    } catch (error) {
        console.error(error);
    }
});