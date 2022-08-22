import { RegisterDTO } from '../dto/RegisterDTO';
import { UserDTO } from '../dto/UserDTO';
import { IUserService } from './IUserService';

export class UserService implements IUserService {
  private id = 0;
  private users: UserDTO[] = [];
  constructor () {
    this.save = this.save.bind(this);
    this.getById = this.getById.bind(this);
    this.getByLogin = this.getByLogin.bind(this);
  }

  public async save (user: RegisterDTO) {
    const newUser = {
      id: this.id,
      ...user
    };

    this.users.push(newUser);

    return newUser;
  }

  public async getById (id: number): Promise<UserDTO | undefined> {
    return this.users.find((user) => user.id === id);
  }

  public async getByLogin (login: string) {
    return this.users.find((user) => user.login === login);
  }
}