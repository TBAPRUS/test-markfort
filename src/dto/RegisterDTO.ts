import { Length } from 'class-validator';

export class RegisterDTO {
  @Length(1, 64)
  public login: string;

  @Length(8, 64)
  public password: string;
}