import { Product } from "../entities/Product";

const { EntityRepository, Repository, getConnection, getRepository, transactionEntityManager } = require("typeorm");

@EntityRepository(Product)
export class ProductRepository extends Repository{
  constructor(){
    super();
    this.connection = getConnection();
    this.queryRunner = this.connection.createQueryRunner();
  }

  async createProduct(name, brand, category, price, photo, description){
    await this.queryRunner.startTransaction();
    try{
      const product = new Product;
      product.name = name;
      product.brand = brand;
      product.category = category;
      product.price = price;
      product.photo = photo;
      product.description = description;
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
    await this.queryRunner.startTransaction()
    try{
      await this.queryRunner.manager.remove(Product, {id: id})
      const { name, brand, category, price, photo, description } = body
      const product = new Product;
      product.id = id;
      product.name = name;
      product.brand = brand;
      product.category = category;
      product.price = price;
      product.photo = photo;
      product.description = description;
      await this.queryRunner.manager.save(product)
      await this.queryRunner.commitTransaction()
    }catch(error){
      console.error(error)
    }finally{
      await this.queryRunner.release()
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
}