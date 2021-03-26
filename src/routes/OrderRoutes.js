import { getCustomRepository, Repository } from "typeorm";
import { OrderLineRepository } from "../repositories/OrderLineRepository";
import { OrderRepository } from "../repositories/OrderRepository";
import { UserRepository } from "../repositories/UserRepository";

const express = require('express')
const orderRouter = express.Router()
const auth = require('../../middlewares/auth')

// create order
orderRouter.post('/orders', auth.isAuth, async (req, res) => {
  const user = req.user
  const level = req.level
  if (level < 1){
    return res.status(403).send({ message: 'You must be an active user to buy, please register' })
  }
  try{
    const { orderLines } = req.body
    const productId = orderLines.productId
    const quantity = orderLines.quantity
    const usuario = await new getCustomRepository(UserRepository).findOne(user)
    console.log(`el user es : ${JSON.stringify(usuario)}`)
    const lines = await new getCustomRepository(OrderLineRepository).createOrderLines(productId, quantity)
    await new getCustomRepository(OrderRepository).createOrder(user, lines)
    return res.status(200).send({ message: 'Order processed' })
  }catch(error){
    res.status(500).send({message: error});
  }
})

// list all the orders
orderRouter.get('/orders', auth.isAuth, async (req, res) => {
  try{
    const orders = await new getCustomRepository(OrderRepository).allOrders()
    res.status(200).send(orders)
  }catch(error){
    console.error(error)
  }
})



// list orders from one user
orderRouter.get('/ordersByUser', auth.isAuth, async (req, res) => {
  const user = req.user
  const level = req.level

  try{
    const orders = await new getCustomRepository(OrderRepository).ordersByUser(user)
    res.status(200).send(orders)
  }catch(error){
    console.error(error)
  }
})

module.exports = orderRouter;
