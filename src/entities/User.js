const { Entity, PrimaryGeneratedColumn, Column } = require("typeorm");
const bcrypt = require('bcrypt-nodejs');

@Entity()
  export class User{
    @PrimaryGeneratedColumn()
    id = undefined;

    @Column('varchar')
    firstName = '';

    @Column('varchar')
    lastName = '';

    @Column('varchar')
    email = '';

    @Column('varchar')
    password = ''
  }