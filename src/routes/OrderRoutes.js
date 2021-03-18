import { getCustomRepository } from "typeorm";
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
    const { user, orderLines } = req.body
    const productId = orderLines.productId
    const quantity = orderLines.quantity

    const lines = await new getCustomRepository(OrderLineRepository).createOrderLines(productId, quantity)
    console.log(`lines are :  ${lines}`)
    let usuario = await new getCustomRepository(UserRepository).getUser(184)
    console.log(usuario)
    await new getCustomRepository(OrderRepository).createOrder(user, lines)
    return res.status(200).send({ message: 'Order processed' })
  }catch(error){
    res.status(500).send({message: error});
  }
})

module.exports = orderRouter;