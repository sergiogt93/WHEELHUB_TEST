import { Router, Request, Response } from 'express';
import userRouter from './core/user/UserRouter';

const routes: Router = Router();

// Activate for requests to http://localhost:${APP_PORT}/api
routes.get('/', (req: Request, res: Response) => {
  res.send('Welcome to tech test to wheelHub')
})

routes.use(userRouter);

export default routes;