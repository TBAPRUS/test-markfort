import { NextFunction, Request, Response, Router } from 'express';
import { AuthController } from './controllers/AuthController';
import { HTTPError } from './errors/HTTPError';
import { AuthHTTPService } from './services/AuthHTTPService';
import { AuthServiceSuperSecret } from './services/AuthServiceSuperSecret';
import { UserService } from './services/UserServiceRAM';

const router = Router();

const userService = new UserService();
const authService = new AuthServiceSuperSecret(userService);
const authHTTPService = new AuthHTTPService();
const authController = new AuthController(authService, authHTTPService);

router.post('/login', authController.login);
router.post('/registration', authController.register);
router.use('/check', authController.check);

router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof HTTPError) {
    return res.status(error.status || 500).json({ message: error.message });
  }
  res.status(500).json({ message: error.message });
});

export { router };