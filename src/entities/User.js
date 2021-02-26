const { Entity, PrimaryGeneratedColumn, Column, Index } = require("typeorm");

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
  }