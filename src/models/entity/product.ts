import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  price!: string;

  @Column()
  quantity!: string;

  @Column()
  image!: string;

}
