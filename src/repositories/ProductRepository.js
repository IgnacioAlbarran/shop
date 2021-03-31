import { Product } from "../entities/Product";

const { EntityRepository, Repository, getConnection, getRepository, transactionEntityManager } = require("typeorm");

@EntityRepository(Product)
export class ProductRepository extends Repository{
  constructor(){
    super();
    this.connection = getConnection();
    this.queryRunner = this.connection.createQueryRunner();
  }

  async createProduct(name, brand, category, price, photo, description, seller){
    await this.queryRunner.startTransaction();
    try{
      const product = new Product;
      product.name = name;
      product.brand = brand;
      product.seller = seller;
      product.category = category;
      product.price = price;
      product.photo = photo;
      product.description = description;
      product.seller = seller;
      await this.queryRunner.manager.save(product)
      await this.queryRunner.commitTransaction()
    }catch(error){
      console.error(error)
      await this.queryRunner.rollbackTransaction();
    }finally{
      await this.queryRunner.release();
    }
  }

  async productList(){
    return this.find();
  }

  async getProduct(id){
    try{
      return this.find({id: id})
    }catch(error){
      console.error(error)
    }
  }

  async updateProduct(id, body){
    let product = await this.findOne({id: id})
    await this.queryRunner.startTransaction()
    try{
      await this.merge(product, body)
      await this.queryRunner.manager.save(product)
      await this.queryRunner.commitTransaction()
    }catch(error){
      console.error(error)
    }finally{
      await this.queryRunner.release()
      return product
    }
  }

  async deleteProduct(id){
    await this.queryRunner.startTransaction()
    try{
      await this.queryRunner.manager.remove(Product, {id: id})
      await this.queryRunner.commitTransaction()
    }catch(error){
      console.error(error)
      await this.queryRunner.rollbackTransaction()
    }finally{
      await this.queryRunner.manager.release()
    }
  }

  async listByCategory(category){
    try{
      return this.find({ category: category })
    }catch(error){
      console.error(error)
    }
  }

  async listByPrice(min, max){
    try{
      const list = await this.find()
      let filteredList = Object.values(list).filter(item => item.price >= min && item.price <= max)
      return filteredList
    }catch(error){
      console.error(error)
    }
  }

  async listBySeller(seller){
    try{
      const list = await this.find()
      let sellerProducts = Object.values(list).filter(item => item.seller >= seller)
      return sellerProducts
    }catch(error){
      console.error(error)
    }
  }
}
