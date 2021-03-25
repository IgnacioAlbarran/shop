const { Entity, PrimaryGeneratedColumn, DeleteDateColumn, Column, Index, OneToMany, JoinColumn } = require("typeorm");
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

    @OneToMany(() => Order, order => order.user)
    @JoinColumn()
    orders = Order;

    @DeleteDateColumn()
    deletedAt = undefined;
  }