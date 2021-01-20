import app from "../index"
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

const express = require('express')
const userRouter = express.Router()

// create user
userRouter.post('/users', async (req, res) => {
  try{
      const { firstName, lastName, email } = req.body
      const user =  await new getCustomRepository(UserRepository).createUser(firstName, lastName, email)
          .then(user => res.send(user))
          .catch(error => console.error(error));
  }catch(error){
      console.error(error)
  }
})

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