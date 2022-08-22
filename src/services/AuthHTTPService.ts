import { Response, Request } from 'express';
import { IAuthHTTPService } from './IAuthHTTPService';

export class AuthHTTPService implements IAuthHTTPService { // Мы можем сделать такой же класс, но он будет работать с header
  constructor () {
    this.response = this.response.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  public response (res: Response, token: string) {
    res.cookie('token', token);
    return res.status(200).json({ token });
  }

  public getToken (req: Request): string | null {
    return req.cookies.token ? req.cookies.token : null;
  }
}