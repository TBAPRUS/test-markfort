import { IsInt, Length } from 'class-validator';

export class UserDTO {
  @IsInt()
  public id: number;

  @Length(1, 64)
  public login: string;

  @Length(8, 64)
  public password: string;
}