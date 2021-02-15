const { Entity, PrimaryGeneratedColumn, Column } = require("typeorm");

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
  }