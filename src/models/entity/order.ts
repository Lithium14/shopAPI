import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {

  @PrimaryGeneratedColumn()
  id!:number;

  @Column()
  quantity!: number;

  @Column()
  totalPrice!: number;

}
