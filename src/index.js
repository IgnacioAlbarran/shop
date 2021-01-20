import "reflect-metadata";
import express from 'express'
import {createConnection, getCustomRepository} from "typeorm";
import { UserRepository } from "./repositories/UserRepository";
// import { userRouter } from "./routes/UserRoutes";

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const userRouter = require("./routes/UserRoutes");

(async () => {
    try{
        const connection = await createConnection()
            .then(console.log('-- Connection established'))
        const queryRunner = connection.createQueryRunner();
    }catch(error){
        console.error(error)
    }
})();

app.get('/', (req, res) => {
    res.send("En ruta principal de la app");
})

// we get user routes
app.use('/', userRouter);

app.listen(3000, () => {
    try{
        console.log('-- Ready on port 3000!');
    }catch(error){
        console.error(error)
    }
})

