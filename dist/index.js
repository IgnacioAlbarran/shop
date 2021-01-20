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

(async function () {
    try {
        var connection = (0, _typeorm.createConnection)().then(console.log('-- Connection established'));
    } catch (error) {
        console.error(error);
    }
})();

app.get('/', function (req, res) {
    res.send("En ruta principal de la app");
});

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

app.listen(3000, function () {
    try {
        console.log('-- Ready on port 3000!');
    } catch (error) {
        console.error(error);
    }
});