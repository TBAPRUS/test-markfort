import { LoginDTO } from '../dto/LoginDTO';
import { RegisterDTO } from '../dto/RegisterDTO';
import { IUserService } from './IUserService';

export abstract class AuthService {
  constructor (
    protected userService: IUserService
  ) {}
  
  abstract login(data: LoginDTO): Promise<string>;
  abstract register(data: RegisterDTO): Promise<string>;
  abstract check(token: string): Promise<boolean>;
}