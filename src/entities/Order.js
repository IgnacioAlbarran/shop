const { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } = require("typeorm");
import { OrderLine } from './OrderLine';
import { User } from './User'

@Entity()
  export class Order{
    @PrimaryGeneratedColumn()
    id = undefined;

    @ManyToOne(() => User, user => user.orders, { eager: true, cascade: true })
    @JoinColumn({name: 'userId'})
    user = User;

    @OneToMany(() => OrderLine, orderLine => orderLine.order)
    orderLines = undefined;
  }
