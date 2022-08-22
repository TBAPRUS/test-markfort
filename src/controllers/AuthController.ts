import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { LoginDTO } from '../dto/LoginDTO';
import { RegisterDTO } from '../dto/RegisterDTO';
import { IAuthHTTPService } from '../services/IAuthHTTPService';
import { AuthService } from '../services/AuthService';

export class AuthController {
  constructor (
    private authService: AuthService,
    private authHTTPService: IAuthHTTPService
  ) {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.check = this.check.bind(this);
  }

  public async login (req: Request, res: Response, next: NextFunction) { // В прошлом тестовом я делал очень удобную валидацию и обработку ошибок на декораторах
    try {
      const dto = plainToInstance(LoginDTO, req.body);
      const errors = await validate(dto);

      if (errors.length) {
        res.status(400).json(errors);
      }

      const token = await this.authService.login(dto);
      this.authHTTPService.response(res, token);
    } catch (error) {
      next(error);
    }
  }

  public async register (req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(RegisterDTO, req.body);
      const errors = await validate(dto);

      if (errors.length) {
        res.status(400).json(errors);
      }

      const token = await this.authService.register(dto);
      this.authHTTPService.response(res, token);
    } catch (error) {
      next(error);
    }
  }

  public async check (req: Request, res: Response, next: NextFunction) {
    try {
      const token = this.authHTTPService.getToken(req);
      if (!token) return res.status(401).end();

      const isAuthed = await this.authService.check(token);
      if (!isAuthed) return res.status(401).end();

      return res.status(200).json({ isAuthed });
    } catch (error) {
      next(error);
    }
  }
}