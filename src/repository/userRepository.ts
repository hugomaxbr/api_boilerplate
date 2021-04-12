import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import AppError from '../errors/appError';

export interface IUserRepo {
  // Exported
  signUp(name: string, email: string, passwd: string): Promise<void>;
  authenticate(email: string, passwd: string): Promise<string>;
  findUserByEmail(email: string): Promise<User | undefined>;
}

@EntityRepository(User)
export class UserRepository extends Repository<User> implements IUserRepo {
  async signUp(name: string, email: string, passwd: string): Promise<void> {
    const user = new User();
    user.name = name;
    user.email = email;
    user.passwd = passwd;

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new AppError('Username already exists');
      }
    }
  }

  async authenticate(email: string, passwd: string): Promise<string> {
    const user = await this.findOne({ email });

    if (user && user.passwd === passwd) {
      return user.email;
    }
    throw new AppError('Invalid credentials');
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ email });
  }
}
