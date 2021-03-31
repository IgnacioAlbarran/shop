const { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } = require("typeorm");
import { Order } from './Order'

@Entity()
  export class Orderline{
    @PrimaryGeneratedColumn()
    id = undefined;

    @ManyToOne(type => Order, order => order.orderlines, { cascade: true })
    @JoinColumn()
    order = Order;

    @Column('integer')
    productId = undefined;

    @Column('integer')
    quantity = undefined;
  }
