"use strict";

var _typeorm = require("typeorm");

var _OrderlineRepository = require("../repositories/OrderlineRepository");

var _OrderRepository = require("../repositories/OrderRepository");

var _UserRepository = require("../repositories/UserRepository");

var express = require('express');
var orderRouter = express.Router();
var auth = require('../../middlewares/auth');

// create order
orderRouter.post('/orders', auth.isAuth, async function (req, res) {
  var user = req.user;
  var level = req.level;

  if (level < 1) {
    return res.status(403).send({ message: 'You must be an active user to buy, please register' });
  }
  try {
    var orderlines = req.body.orderlines;

    var productId = orderlines.productId;
    var quantity = orderlines.quantity;
    console.log('la orden ha llegado aqui');

    var usuario = await new _typeorm.getCustomRepository(_UserRepository.UserRepository).findOne(user);
    console.log("el user es : " + JSON.stringify(usuario));
    var lines = await new _typeorm.getCustomRepository(_OrderlineRepository.OrderlineRepository).createOrderlines(productId, quantity);
    await new _typeorm.getCustomRepository(_OrderRepository.OrderRepository).createOrder(usuario, lines);
    return res.status(200).send({ message: 'Order processed' });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

// list all the orders
orderRouter.get('/orders', auth.isAuth, async function (req, res) {
  try {
    var orders = await new _typeorm.getCustomRepository(_OrderRepository.OrderRepository).allOrders();
    res.status(200).send(orders);
  } catch (error) {
    console.error(error);
  }
});

// list orders from one user
orderRouter.get('/ordersByUser', auth.isAuth, async function (req, res) {
  var user = req.user;
  var level = req.level;

  try {
    var orders = await new _typeorm.getCustomRepository(_OrderRepository.OrderRepository).ordersByUser(user);
    res.status(200).send(orders);
  } catch (error) {
    console.error(error);
  }
});

module.exports = orderRouter;