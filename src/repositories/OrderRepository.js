import { Order } from "../entities/Order";
import { Orderline } from "../entities/Orderline";

const { EntityRepository, Repository, getConnection, getRepository, transactionEntityManager } = require("typeorm");

@EntityRepository(Order)
export class OrderRepository extends Repository{
  constructor(){
    super();
    this.connection = getConnection();
    this.queryRunner = this.connection.createQueryRunner();
  }

  async createOrder(user, orderlines){
    await this.queryRunner.startTransaction();
    try{
      let orderline = new Orderline;
      orderline.productId = orderlines.productId;
      orderline.quantity = orderlines.quantity;
      let order = new Order;
      order.user = user;
      order.orderlines = orderline;
      console.log(`the order is ${JSON.stringify(order)}`)
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
      const orders = await this.find({relations: ["user", "orderlines"], userId: user})
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


