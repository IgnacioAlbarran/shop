import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

const auth = require("../../middlewares/auth.js");
const express = require('express')
const userRouter = express.Router()
const service = require('../../services/index.js')
const secrets = require('../../secrets')
const bcrypt = require('bcrypt');

// create user
userRouter.post('/signUp', async (req, res) => {
  try{
    const { firstName, lastName, email, password , level } = req.body
    const user =  await new getCustomRepository(UserRepository).signUp(firstName, lastName, email, password, level)
    return res.status(200).send({ token: await service.auth(user) })
  }catch(error){
    res.status(500).send({message: 'Error creating user. Please double-check the data.'});
  }
})

// Sign In
userRouter.post('/signIn', async(req, res) => {
  await new getCustomRepository(UserRepository).find({ email: req.body.email })
    .then((user) => {
      bcrypt.compare(req.body.password, user[0].password, function(err, resultado) {
        if (resultado == false) res.send({success: false, message: 'passwords does not match'});
        if (resultado == true) {
          req.user = user[0];
          return res.send({ token: service.auth(req.user) })
        }
      });
    })
    .catch(error => res.send({ error: error.message })
)})

// index user
userRouter.get('/users', auth.isAuth, async(req, res) => {
  if (req.level < service.USUARIOS.admin){
    return res.status(403).send({ message: 'Forbidden' })
  }
  try{
    const users =  await new getCustomRepository(UserRepository).getUsers()
      .then(users => res.send(users))
      .catch(error => console.error(error))
  }catch(error){
    console.error(error)
  }
})

// show user
userRouter.get('/users/:id', auth.isAuth, async (req, res) => {
  let { id } = req.params
  let user = req.user
  if ((user != parseInt(id)) && (req.level < service.USUARIOS.admin)){
    return res.status(403).send({ message: 'Forbidden' })
  }
  try{
    await new getCustomRepository(UserRepository).getUser(id)
      .then(user => res.send(user))
  }catch(error){
    console.error(error)
  }
})

// update user
userRouter.put('/users/:id', auth.isAuth, async (req, res) => {
  let { id } = req.params
  let user = req.body

  if ((req.user != parseInt(id)) && (req.level < service.USUARIOS.admin)){
    return res.status(403).send({ message: 'Forbidden' })
  }
  try{
    await new getCustomRepository(UserRepository).updateUser(id, user)
      .then(user => res.send(user))
  }catch(error){
    console.error(error)
  }
})

// delete user
userRouter.delete('/users/:id', async(req, res) =>{
  let { id } = req.params
  let user = req.body

  if ((req.user != parseInt(id)) && (req.level < service.USUARIOS.admin)){
    return res.status(403).send({ message: 'Forbidden' })
  }
  try{
    const id = req.params.id
    await new getCustomRepository(UserRepository).deleteUser(id)
        .then(res.send(`Deleted ID:  ${id}`))
  }catch(error){
    console.error(error)
  }
})

module.exports = userRouter;
