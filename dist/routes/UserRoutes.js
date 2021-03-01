"use strict";

var _index = require("../index");

var _index2 = _interopRequireDefault(_index);

var _typeorm = require("typeorm");

var _UserRepository = require("../repositories/UserRepository");

var _User = require("../entities/User");

var _vm = require("vm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = require("../../middlewares/auth.js");
var express = require('express');
var userRouter = express.Router();
var service = require('../../services/index.js');
var secrets = require('../../secrets');
var bcrypt = require('bcrypt');

// create user
userRouter.post('/signUp', async function (req, res) {
  try {
    var _req$body = req.body,
        firstName = _req$body.firstName,
        lastName = _req$body.lastName,
        email = _req$body.email,
        password = _req$body.password,
        level = _req$body.level;

    var user = await new _typeorm.getCustomRepository(_UserRepository.UserRepository).signUp(firstName, lastName, email, password, level);
    return res.status(200).send({ token: await service.auth(user) });
  } catch (error) {
    res.status(500).send({ message: 'Error creating user. Please double-check the data.' });
  }
});

// Sign In
userRouter.post('/signIn', async function (req, res) {
  await new _typeorm.getCustomRepository(_UserRepository.UserRepository).find({ email: req.body.email }).then(function (user) {
    bcrypt.compare(req.body.password, user[0].password, function (err, resultado) {
      console.log("resultado is : " + resultado);
      if (resultado == false) res.send({ success: false, message: 'passwords does not match' });
      if (resultado == true) {
        req.user = user[0];
        return res.send({ token: service.auth(req.user) });
      }
    });
  }).catch(function (error) {
    return res.send({ error: error.message });
  });
});

// index user
userRouter.get('/users', auth.isAuth, async function (req, res) {
  if (req.level < service.USUARIOS.admin) {
    return res.status(403).send({ message: 'Forbidden' });
  }
  try {
    var users = await new _typeorm.getCustomRepository(_UserRepository.UserRepository).getUsers().then(function (users) {
      return res.send(users);
    }).catch(function (error) {
      return console.error(error);
    });
  } catch (error) {
    console.error(error);
  }
});

// show user
userRouter.get('/users/:id', auth.isAuth, async function (req, res) {
  var id = req.params.id;

  var user = req.user;
  if (user != parseInt(id) && req.level < service.USUARIOS.admin) {
    return res.status(403).send({ message: 'Forbidden' });
  }
  try {
    await new _typeorm.getCustomRepository(_UserRepository.UserRepository).getUser(id).then(function (user) {
      return res.send(user);
    });
  } catch (error) {
    console.error(error);
  }
});

// update user
userRouter.put('/users/:id', auth.isAuth, async function (req, res) {
  var id = req.params.id;

  var user = req.body;

  if (req.user != parseInt(id) && req.level < service.USUARIOS.admin) {
    return res.status(403).send({ message: 'Forbidden' });
  }
  try {
    await new _typeorm.getCustomRepository(_UserRepository.UserRepository).updateUser(id, user).then(function (user) {
      return res.send(user);
    });
  } catch (error) {
    console.error(error);
  }
});

// delete user
userRouter.delete('/users/:id', async function (req, res) {
  try {
    var id = req.params.id;
    await new _typeorm.getCustomRepository(_UserRepository.UserRepository).deleteUser(id).then(res.send("Deleted ID:  " + id));
  } catch (error) {
    console.error(error);
  }
});

module.exports = userRouter;