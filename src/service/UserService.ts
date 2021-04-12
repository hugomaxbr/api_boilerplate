import AppError from '../errors/appError';
import { IUserRepo } from '../repository/userRepository';

interface SignUpDTO {
  name: string;
  email: string;
  password: string;
}

export class UserService {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async signUp({ name, email, password }: SignUpDTO): Promise<void> {
    const foundUserByMail = await this.userRepo.findUserByEmail(email);
    if (foundUserByMail) {
      throw new AppError('User already exists', 400);
    } else {
      return this.userRepo.signUp(name, email, password);
    }
  }

  // async signIn(
  //   authCredentialsDto: AuthCredentialsDto
  // ): Promise<{ accessToken: string }> {
  //   const username = await this.userRepository.validateUserPassword(
  //     authCredentialsDto
  //   );
  //   if (!username) {
  //     throw new UnauthorizedException('Invalid Credentials');
  //   }
  //   const payload: JwtPayload = { username };
  //   const accessToken = await this.jwtService.sign(payload);
  //   this.logger.debug(
  //     `Generated JWT Token with payload ${JSON.stringify(payload)}`
  //   );

  //   return { accessToken };
  // }
}
