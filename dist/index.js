"use strict";

require("reflect-metadata");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _typeorm = require("typeorm");

var _UserRepository = require("./repositories/UserRepository");

var _process = require("process");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var morgan = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var userRouter = require("./routes/UserRoutes");
var productRouter = require("./routes/ProductRoutes");
var orderRouter = require("./routes/OrderRoutes");

// middlewares

app.use(morgan('dev'));
app.use(cors('dev'));
app.use(bodyParser.json());

// connection

var connection = (0, _typeorm.createConnection)().then(console.log('-- Connection established')).catch(function (error) {
    return console.error(error);
});

// routes

app.get('/', function (req, res) {
    res.send("En ruta principal de la app");
});

// we get user routes
app.use('/', userRouter);
// we get product routes
app.use('/', productRouter);
// we get order routes
app.use('/', orderRouter);

app.listen(3000, function () {
    try {
        console.log('-- Ready on port 3000!');
    } catch (error) {
        console.error(error);
    }
});