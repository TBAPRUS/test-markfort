import { RegisterDTO } from '../dto/RegisterDTO';
import { UserDTO } from '../dto/UserDTO';

export interface IUserService {
  save(user: RegisterDTO): Promise<UserDTO>
  getById(id: number): Promise<UserDTO | undefined>
  getByLogin(login: string): Promise<UserDTO | undefined>
}