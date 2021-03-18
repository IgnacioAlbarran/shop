const { Entity, PrimaryGeneratedColumn, Column, ManyToOne } = require("typeorm");
import { Order } from './Order'

@Entity()
  export class OrderLine{
    @PrimaryGeneratedColumn()
    id = undefined;

    @ManyToOne(type => Order, order => order.orderLines, { cascade: true })
    order = Order;

    @Column('integer')
    productId = undefined;

    @Column('integer')
    quantity = undefined;
  }
