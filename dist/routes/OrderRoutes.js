"use strict";

var _typeorm = require("typeorm");

var _OrderLineRepository = require("../repositories/OrderLineRepository");

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
    var _req$body = req.body,
        _user = _req$body.user,
        orderLines = _req$body.orderLines;

    var productId = orderLines.productId;
    var quantity = orderLines.quantity;

    var lines = await new _typeorm.getCustomRepository(_OrderLineRepository.OrderLineRepository).createOrderLines(productId, quantity);
    console.log("lines are :  " + lines);
    var usuario = await new _typeorm.getCustomRepository(_UserRepository.UserRepository).getUser(184);
    console.log(usuario);
    await new _typeorm.getCustomRepository(_OrderRepository.OrderRepository).createOrder(_user, lines);
    return res.status(200).send({ message: 'Order processed' });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

module.exports = orderRouter;