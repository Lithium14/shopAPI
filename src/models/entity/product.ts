import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name! : string;

  @Column()
  price! : string;

  @Column()
  quantity! : string;

  @Column()
  image!: string;

}
