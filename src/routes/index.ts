import { Router } from 'express';
import usersRouter from './users.routes';


const routes = Router();

routes.get('/ping', (req, res) => {
	res.send('pong');
});

routes.use('/users', usersRouter);

export default routes;
