"use strict";

require("reflect-metadata");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _typeorm = require("typeorm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var morgan = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var userRouter = require("./routes/UserRoutes");
var productRouter = require("./routes/ProductRoutes");
var orderRouter = require("./routes/OrderRoutes");
var swaggerJsDoc = require('swagger-jsdoc');
var swaggerUi = require("swagger-ui-express");

// middlewares
app.use(morgan('dev'));
app.use(cors('dev'));
app.use(bodyParser.json());

// swagger to document the API
var swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Shop API',
            version: '1.0.0',
            description: 'API de e-commerce para venta de consumibles de informática',
            servers: ["http://localhost:3000"]
        }
    },
    basePath: "/",
    apis: ['index.js']
};
var swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//routes
/**
* @swagger
* /:
*   get:
*     description: Use to get the list of products
*     responses:
*       '200':
*         description: successful response
*/

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