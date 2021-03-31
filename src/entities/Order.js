const { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } = require("typeorm");
import { Orderline } from './Orderline';
import { User } from './User'

@Entity()
  export class Order{
    @PrimaryGeneratedColumn()
    id = undefined;

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn()
    user = User;

    @OneToMany(() => Orderline, orderline => orderline.order)
    orderlines = Orderline;
  }
