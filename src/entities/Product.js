const { Entity, PrimaryGeneratedColumn, Column } = require("typeorm");

@Entity()
  export class Product{
    @PrimaryGeneratedColumn()
    id = undefined

    @Column('varchar')
    name = '';

    @Column('varchar')
    brand = '';

    @Column('integer')
    category = undefined;

    @Column('integer')
    price = undefined;

    @Column('varchar')
    photo = '';

    @Column('varchar')
    description = '';
  }