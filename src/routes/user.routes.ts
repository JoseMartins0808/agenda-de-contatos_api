import { Router } from 'express';
import userControllers from '../controllers/userControllers';

export const userRoutes: Router = Router();
userRoutes.post('', userControllers.create);
