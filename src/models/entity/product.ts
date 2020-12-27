import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column( {nullable: true} )
  name!: string;

  @Column({nullable: true})
  price!: string;

  @Column({nullable: true})
  quantity!: string;

  @Column({nullable: true})
  image!: string;

}
