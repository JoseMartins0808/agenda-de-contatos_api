import express from 'express';
import { userRoutes } from './routes/user.routes';


export const application = express();
application.use(express.json());
application.use('/user', userRoutes);

