const { Entity, PrimaryGeneratedColumn, DeleteDateColumn, Column, Index, OneToMany } = require("typeorm");
import { Order } from './Order'

@Entity()
  export class User{
    @PrimaryGeneratedColumn()
    id = undefined;

    @Column('varchar')
    firstName = '';

    @Column('varchar')
    lastName = '';

    @Index({unique: true})
    @Column('varchar')
    email = '';

    @Column('varchar')
    password = ''

    @Column({type: 'integer', default: 1})
    level = undefined

    @OneToMany(type => Order, order => order.user)
    orders = Order;

    @DeleteDateColumn()
    deletedAt = undefined;
  }