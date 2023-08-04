import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import { userRoutes } from './routes/user.routes';
import { handleErrors } from './errors/handleErrors';
import { loginRoutes } from './routes/login.routes';
import cors from 'cors';
import { contatcRoutes } from './routes/contact.routes';

export const application = express();
application.use(express.json());
application.use(cors());

application.use('/users', userRoutes);
application.use('/login', loginRoutes);
application.use('/contacts', contatcRoutes);

application.use(handleErrors);