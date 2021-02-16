"use strict";

var _index = require("../index");

var _index2 = _interopRequireDefault(_index);

var _typeorm = require("typeorm");

var _ProductRepository = require("../repositories/ProductRepository");

var _moment = require("moment");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var productRouter = express.Router();

// index
productRouter.get('/products', async function (req, res) {
  var products = await new _typeorm.getCustomRepository(_ProductRepository.ProductRepository).productList().then(function (products) {
    return res.send(products);
  }).catch(function (error) {
    return console.error(error);
  });
});

// create
productRouter.post('/products', async function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      brand = _req$body.brand,
      seller = _req$body.seller,
      category = _req$body.category,
      price = _req$body.price,
      photo = _req$body.photo,
      description = _req$body.description;

  try {
    var product = await new _typeorm.getCustomRepository(_ProductRepository.ProductRepository).createProduct(name, brand, seller, category, price, photo, description).then(function (product) {
      return res.send(product);
    });
  } catch (error) {
    console.error(error);
  }
});

// show
productRouter.get('/products/:id', async function (req, res) {
  var id = req.params.id;

  try {
    await new _typeorm.getCustomRepository(_ProductRepository.ProductRepository).getProduct(id).then(function (product) {
      return res.send(product);
    });
  } catch (error) {
    console.error(error);
  }
});

// update
productRouter.put('/products/:id', async function (req, res) {
  var id = req.params.id;

  var newAttributes = req.body;
  try {
    await new _typeorm.getCustomRepository(_ProductRepository.ProductRepository).updateProduct(id, newAttributes).then(function (product) {
      return res.send(product);
    });
  } catch (error) {
    console.error(error);
  }
});

// delete
productRouter.delete('/products/:id', async function (req, res) {
  var id = req.params.id;

  try {
    await new _typeorm.getCustomRepository(_ProductRepository.ProductRepository).deleteProduct(id).then(res.send("Deleted product id: " + id));
  } catch (error) {
    console.error(error);
  }
});

// listByCategory
productRouter.get('/listByCategory/:category', async function (req, res) {
  var category = req.params.category;

  try {
    await new _typeorm.getCustomRepository(_ProductRepository.ProductRepository).listByCategory(category).then(function (products) {
      return res.send(products);
    });
  } catch (error) {
    console.error(error);
  }
});

// listByPrice
productRouter.get('/listByPrice', async function (req, res) {
  var _req$body2 = req.body,
      min = _req$body2.min,
      max = _req$body2.max;

  try {
    await new _typeorm.getCustomRepository(_ProductRepository.ProductRepository).listByPrice(min, max).then(function (productsFiltered) {
      return res.send(productsFiltered);
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = productRouter;