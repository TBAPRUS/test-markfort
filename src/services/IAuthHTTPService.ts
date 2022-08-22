import { Request, Response } from 'express';

export interface IAuthHTTPService {
  response(res: Response, token: string): any
  getToken(req: Request): string | null
}