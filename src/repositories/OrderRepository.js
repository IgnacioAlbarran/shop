import { Order } from "../entities/Order";
import { OrderLine } from "../entities/OrderLine";

const { EntityRepository, Repository, getConnection, getRepository, transactionEntityManager } = require("typeorm");

@EntityRepository(Order)
export class OrderRepository extends Repository{
  constructor(){
    super();
    this.connection = getConnection();
    this.queryRunner = this.connection.createQueryRunner();
  }

  async createOrder(user, orderLines){
    await this.queryRunner.startTransaction();
    try{
      let orderLine = new OrderLine;
      orderLine.productId = orderLines.productId;
      orderLine.quantity = orderLines.quantity;
      let order = new Order;
      order.user = user;
      order.orderLines = orderLines;
      await this.queryRunner.manager.save(order)
      await this.queryRunner.commitTransaction()
    }catch(error){
      console.error(error)
      await this.queryRunner.rollbackTransaction();
    }finally{
      await this.queryRunner.release();
    }
  }

  async ordersByUser(user){
    try{
      const orders = await this.find({relations: ["user", "orderLines"], userId: user})
      return orders
    }catch(error){
      console.error(error)
    }
  }

  async allOrders(){
    try{
      const orders = await this.find()
      return orders
    }catch(error){
      console.error(error)
    }
  }
}


