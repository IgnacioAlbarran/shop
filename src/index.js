import "reflect-metadata";
import express from 'express'
import {createConnection, getCustomRepository} from "typeorm";
import { UserRepository } from "./repositories/UserRepository";
import { ppid } from "process";
const app = express();
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser');
const userRouter = require("./routes/UserRoutes");
const productRouter = require("./routes/ProductRoutes");
const orderRouter = require("./routes/OrderRoutes");

// middlewares

app.use(morgan('dev'));
app.use(cors('dev'))
app.use(bodyParser.json());

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


