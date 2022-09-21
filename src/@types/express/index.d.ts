import authMiddleware from 'src/modules/users/middlewares/auth.middleware';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}
