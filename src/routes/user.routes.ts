import { Router } from 'express';
import userControllers from '../controllers/userControllers';
import { ensureBodyMiddleware } from '../middlewares/ensureBody.middleware';
import { userSchemaRequest } from '../schemas/user.schemas';
import { } from '../middlewares/userMiddlewares/user.middlewares';
import userMiddlewares from '../middlewares/userMiddlewares';

export const userRoutes: Router = Router();

userRoutes.post('', ensureBodyMiddleware(userSchemaRequest), userMiddlewares.ensureUniqueEmail,
    userMiddlewares.ensureUniquePhone, userMiddlewares.ensureUniqueFullName,
    userMiddlewares.ensureUniqueUsername, userControllers.create);

userRoutes.get('', userControllers.getAll);

userRoutes.get('/:id', userControllers.getUser);