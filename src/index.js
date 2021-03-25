import "reflect-metadata";
import express from 'express'
import {createConnection, getCustomRepository} from "typeorm";
const app = express();
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser');
const userRouter = require("./routes/UserRoutes");
const productRouter = require("./routes/ProductRoutes");
const orderRouter = require("./routes/OrderRoutes");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");

// middlewares
app.use(morgan('dev'));
app.use(cors('dev'))
app.use(bodyParser.json());

// swagger to document the API
const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title: 'Shop API',
            version: '1.0.0',
            description: 'API de e-commerce para venta de consumibles de informática',
            servers: ["http://localhost:3000"]
        }
    },
    basePath: "/",
    apis: ['index.js']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);
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
const connection = createConnection()
    .then(console.log('-- Connection established'))
    .catch(error => console.error(error))

// routes

app.get('/', (req, res) => {
    res.send("En ruta principal de la app");
})

// we get user routes
app.use('/', userRouter);
// we get product routes
app.use('/', productRouter);
// we get order routes
app.use('/', orderRouter);

app.listen(3000, () => {
    try{
        console.log('-- Ready on port 3000!');
    }catch(error){
        console.error(error)
    }
})


