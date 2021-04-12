import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repository/userRepository';
import { UserService } from '../service/UserService';

export class UserController {
  public async signUp(req: Request, res: Response): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);
    const userService = new UserService(userRepository);
    const { name, email, password } = req.body;

    const user = await userService.signUp({ name, email, password });
    return res.json(user);
  }
}
