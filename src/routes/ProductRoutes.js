import { EntityRepository, Repository, getConnection, getCustomRepository, transactionEntityManager } from "typeorm";
import { ProductRepository } from "../repositories/ProductRepository";
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require("swagger-ui-express");
import { UserRepository } from "../repositories/UserRepository";

const express = require('express');
const productRouter = express.Router();
const auth = require("../../middlewares/auth.js");


// index
/**
 * @swagger
 * /products:
 *  get:
 *     description: Use to get the list of products
 *     responses:
 *       '200':
 *         description: successful response
 */
productRouter.get('/products', async(req, res) => {
  const products = await new getCustomRepository(ProductRepository).productList()
    .then(products => res.send(products))
    .catch(error => console.error(error))
})

// create
productRouter.post('/products', async(req, res) => {
  const { name, brand, seller, category, price, photo, description } = req.body
  try{
    const product = await new getCustomRepository(ProductRepository).createProduct(name, brand, seller, category, price, photo, description)
      .then(product => res.send(product))
  }catch(error){
    console.error(error)
  }
})

// show
productRouter.get('/products/:id', async(req, res) => {
  const { id } = req.params;
  try{
    await new getCustomRepository(ProductRepository).getProduct(id)
      .then(product => res.send(product))
  }catch(error){
    console.error(error)
  }
})

// update
productRouter.put('/products/:id', auth.isAuth, async(req, res) =>{
  const { id } = req.params
  const newAttributes = req.body
  const user = req.user;
  const level = req.level;
  const product = await new getCustomRepository(ProductRepository).getProduct(id)
  if ((level < 2 || product.seller != user) && (level < 3)){
    return res.status(403).send({message: 'Forbidden'})
  }
  try{
    await new getCustomRepository(ProductRepository).updateProduct(id, newAttributes)
      .then(product => res.send(product))
  }catch(error){
    console.error(error)
  }
})

// delete
productRouter.delete('/products/:id', async(req, res) =>{
  const { id } = req.params
  try{
    await new getCustomRepository(ProductRepository).deleteProduct(id)
      .then(res.send(`Deleted product id: ${id}`))
  }catch(error){
    console.error(error)
  }
})

// listByCategory
productRouter.get('/listByCategory/:category', async(req, res)=> {
  const { category } = req.params
  try{
    await new getCustomRepository(ProductRepository).listByCategory(category)
      .then(products => res.send(products))
  }catch(error){
    console.error(error)
  }
})

// listByPrice
productRouter.get('/listByPrice', async(req, res) => {
  const { min, max } = req.body
  try{
    await new getCustomRepository(ProductRepository).listByPrice(min, max)
      .then(productsFiltered => res.send(productsFiltered))
  }catch(error){
    console.error(error)
  }
})

// listBySeller
productRouter.get('/listBySeller', async(req, res) => {
  const { seller } = req.body
  try{
    await new getCustomRepository(ProductRepository).listBySeller(seller)
      .then( sellerProductsList => res.send(sellerProductsList))
  }catch(error){
    console.error(error)
  }
})

module.exports = productRouter;
