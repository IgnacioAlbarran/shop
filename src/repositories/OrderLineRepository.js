import { Orderline } from "../entities/Orderline.js";

const { EntityRepository, Repository, getConnection, transactionEntityManager } = require("typeorm");

@EntityRepository(Orderline)
export class OrderlineRepository extends Repository{
  constructor(){
    super();
    this.connection = getConnection();
    this.queryRunner = this.connection.createQueryRunner();
  }

  async createOrderlines(productId, quantity){
    await this.queryRunner.startTransaction();
    try{
      let orderline = new Orderline;
      orderline.productId = productId;
      orderline.quantity = quantity;
      await this.queryRunner.manager.save(orderline)
      await this.queryRunner.commitTransaction()
      return orderline
    }catch(error){
      console.error(error)
      await this.queryRunner.rollbackTransaction();
    }finally{
      await this.queryRunner.release()
    }
  }
}
