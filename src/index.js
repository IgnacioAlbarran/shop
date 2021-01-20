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
        const connection = createConnection()
            .then(console.log('-- Connection established'))
    }catch(error){
        console.error(error)
    }
})();

app.get('/', (req, res) => {
    res.send("En ruta principal de la app");
})

// // create user
// app.post('/users', async (req, res) => {
//     try{
//         const { firstName, lastName, email } = req.body
//         const user =  await new getCustomRepository(UserRepository).createUser(firstName, lastName, email)
//             .then(user => res.send(user))
//             .catch(error => console.error(error));
//     }catch(error){
//         console.error(error)
//     }
// })

// index user
app.use('/', userRouter);

// // index user
// app.get('/users', async (req, res) => {
//     try{
//         const users =  await new getCustomRepository(UserRepository).getUsers()
//             .then(users => res.send(users))
//             .catch(error => console.error(error))
//     }catch(error){
//         console.error(error)
//     }
// })

// // show user
// app.get('/users/:id', async (req, res) => {
//     try{
//         const { id } = req.params
//         await new getCustomRepository(UserRepository).getUser(id)
//             .then(user => res.send(user))
//     }catch(error){
//         console.error(error)
//     }
// })

// // update user
// app.put('/users/:id', async (req, res) => {
//     try{
//         const { id } = req.params
//         const user = req.body
//         await new getCustomRepository(UserRepository).updateUser(id, user)
//             .then(user => res.send(user))
//     }catch(error){
//         console.error(error)
//     }
// })

// // delete user
// app.delete('/users/:id', async(req, res) =>{
//     try{
//         const id = req.params.id
//         await new getCustomRepository(UserRepository).deleteUser(id)
//             .then(res.send(`Deleted ID:  ${id}`))
//     }catch(error){
//         console.error(error)
//     }
// })

app.listen(3000, () => {
    try{
        console.log('-- Ready on port 3000!');
    }catch(error){
        console.error(error)
    }
})

