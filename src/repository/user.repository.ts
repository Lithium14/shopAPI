import { User } from '../models/entity/user';
import { EntityRepository, Repository} from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  private static instance: UserRepository;

  static getInstance() {
      if (!this.instance) {
          this.instance = new UserRepository();
      }
      return this.instance;
  }

  private constructor() {
    super();
  }


}
