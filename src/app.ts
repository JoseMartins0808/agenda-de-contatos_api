import express from 'express';
import 'reflect-metadata';
import 'express-async-errors';
import { userRoutes } from './routes/user.routes';
import { handleErrors } from './errors/handleErrors';

export const application = express();
application.use(express.json());

application.use('/user', userRoutes);

application.use(handleErrors);

