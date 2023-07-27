import express from 'express';
import 'reflect-metadata';
import 'express-async-errors';
import { userRoutes } from './routes/user.routes';
import { handleErrors } from './errors/handleErrors';
import { loginRoutes } from './routes/login.routes';

export const application = express();
application.use(express.json());

application.use('/users', userRoutes);
application.use('/login', loginRoutes);

application.use(handleErrors);

