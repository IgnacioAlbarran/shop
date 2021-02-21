import app from "../index"
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";

const express = require('express')
const userRouter = express.Router()
const service = require('../../services/index.js')
const secrets = require('../../secrets')
const bcrypt = require('bcrypt');

// create user
userRouter.post('/signUp', async (req, res) => {
  try{
    const { firstName, lastName, email, password } = req.body
    const user =  await new getCustomRepository(UserRepository).signUp(firstName, lastName, email, password)
    return res.status(200).send({ token: await service.auth(user) })
  }catch(error){
    res.status(500).send({message: 'Error creating user. Please double-check the data.'});
  }
})

userRouter.post('/signIn', async(req, res) => {
  await new getCustomRepository(UserRepository).find({ email: req.body.email })
    .then((user) => {
      bcrypt.compare(req.body.password, user[0].password, function(err, resultado) {
        console.log(`resultado is : ${resultado}`)
        if (resultado == false) res.send({success: false, message: 'passwords does not match'});
        if (resultado == true) {
          req.user = user;
          return res.send({ token: service.auth(req.user) })
        }
      });
    })
    .catch(error => res.send({ error: error.message })
)})

// index user
userRouter.get('/users', async (req, res) => {
  try{
    const users =  await new getCustomRepository(UserRepository).getUsers()
      .then(users => res.send(users))
      .catch(error => console.error(error))
  }catch(error){
    console.error(error)
  }
})

// show user
userRouter.get('/users/:id', async (req, res) => {
  try{
    const { id } = req.params
    await new getCustomRepository(UserRepository).getUser(id)
      .then(user => res.send(user))
  }catch(error){
    console.error(error)
  }
})

// update user
userRouter.put('/users/:id', async (req, res) => {
  try{
    const { id } = req.params
    const user = req.body
    await new getCustomRepository(UserRepository).updateUser(id, user)
      .then(user => res.send(user))
  }catch(error){
    console.error(error)
  }
})

// delete user
userRouter.delete('/users/:id', async(req, res) =>{
  try{
    const id = req.params.id
    await new getCustomRepository(UserRepository).deleteUser(id)
        .then(res.send(`Deleted ID:  ${id}`))
  }catch(error){
    console.error(error)
  }
})

module.exports = userRouter;