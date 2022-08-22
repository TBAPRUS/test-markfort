import { HTTPError } from '../errors/HTTPError';
import { LoginDTO } from '../dto/LoginDTO';
import { RegisterDTO } from '../dto/RegisterDTO';
import { AuthService } from './AuthService';
import { IUserService } from './IUserService';

export class AuthServiceSuperSecret extends AuthService {
  constructor (userService: IUserService) {
    super(userService);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.check = this.check.bind(this);
  }

  private generateToken (id: number) {
    return `superSecretToken:${id}`;
  }

  private hashPassword (password: string) {
    return `superSecretHash:${password}`;
  }

  private unhashPassword (hash: string) {
    return parseInt(hash.split(':')?.[1]);
  }

  public async login (data: LoginDTO): Promise<string> {
    const user = await this.userService.getByLogin(data.login);

    if (this.hashPassword(data.password) !== user?.password) {
      throw new HTTPError('Invalid password', 400);
    }

    return this.generateToken(user.id);
  }

  public async register (data: RegisterDTO): Promise<string> {
    const user = await this.userService.save({
      ...data,
      password: this.hashPassword(data.password)
    });

    return this.generateToken(user.id);
  }

  public async check (token: string): Promise<boolean> {
    const id = this.unhashPassword(token);
    if (typeof id === undefined) return false;

    const user = await this.userService.getById(id);
    if (!user) return false;

    return true;
  }
}