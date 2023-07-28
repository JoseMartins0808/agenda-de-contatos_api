import { Router } from 'express';
import userControllers from '../controllers/userControllers';
import { ensureBodyMiddleware } from '../middlewares/ensureBody.middleware';
import { userSchemaRequest, userUpdateSchemaRequest } from '../schemas/user.schemas';
import { } from '../middlewares/userMiddlewares/user.middlewares';
import userMiddlewares from '../middlewares/userMiddlewares';
import authenticationMiddlewares from '../middlewares/authenticationMiddlewares';

export const userRoutes: Router = Router();

userRoutes.post('', ensureBodyMiddleware(userSchemaRequest), userMiddlewares.ensureUniqueEmail,
    userMiddlewares.ensureUniquePhone, userMiddlewares.ensureUniqueFullName,
    userMiddlewares.ensureUniqueUsername, userControllers.create);

userRoutes.get('', authenticationMiddlewares.verifyIsAdmin, userControllers.getAll);

userRoutes.get('/:userId', userMiddlewares.verifyUserExistsById, authenticationMiddlewares.verifyIsAdminOrOwner,
    userControllers.getUser);

userRoutes.patch('/:userId', ensureBodyMiddleware(userUpdateSchemaRequest),
    userMiddlewares.verifyUserExistsById, authenticationMiddlewares.verifyIsAdminOrOwner,
    userControllers.updateUser);

userRoutes.delete('/:userId', userMiddlewares.verifyUserExistsById, authenticationMiddlewares.verifyIsAdminOrOwner,
    userControllers.softDelete);

userRoutes.post('/:userId', userMiddlewares.verifyUserExistsById, authenticationMiddlewares.verifyIsAdmin,
    userMiddlewares.verifyUserIsActive, userControllers.reactivateUser);