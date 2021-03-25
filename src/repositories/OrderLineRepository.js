import { OrderLine } from "../entities/OrderLine.js";

const { EntityRepository, Repository, getConnection, transactionEntityManager } = require("typeorm");

@EntityRepository(OrderLine)
export class OrderLineRepository extends Repository{
  constructor(){
    super();
    this.connection = getConnection();
    this.queryRunner = this.connection.createQueryRunner();
  }

  async createOrderLines(productId, quantity){
    await this.queryRunner.startTransaction();
    try{
      let orderLine = new OrderLine;
      orderLine.productId = productId;
      orderLine.quantity = quantity;
      await this.queryRunner.manager.save(orderLine)
      await this.queryRunner.commitTransaction()
      return orderLine
    }catch(error){
      console.error(error)
      await this.queryRunner.rollbackTransaction();
    }finally{
      await this.queryRunner.release()
    }
  }
}
