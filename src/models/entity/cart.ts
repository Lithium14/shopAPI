import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  quantity!: string;

  @Column()
  totalPrice! : number;

}
