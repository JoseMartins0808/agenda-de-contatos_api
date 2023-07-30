import { Router } from "express";
import { ensureBodyMiddleware } from "../middlewares/ensureBody.middleware";
import authenticationMiddlewares from "../middlewares/authenticationMiddlewares";
import { contactSchemaRequest } from "../schemas/contact.schemas";
import contactControllers from "../controllers/contactControllers";
import contactMiddlewares from "../middlewares/contactMiddlewares";

export const contatcRoutes = Router();

contatcRoutes.post('', ensureBodyMiddleware(contactSchemaRequest), contactMiddlewares.ensureUniqueFullName,
    contactMiddlewares.ensureUniqueEmail, contactMiddlewares.ensureUniquePhone, authenticationMiddlewares.verifyIsActiveByToken,
    contactControllers.create);

contatcRoutes.get('', authenticationMiddlewares.verifyIsActiveByToken, contactControllers.getAll);

contatcRoutes.delete('/:contactId', authenticationMiddlewares.verifyIsActiveByToken, contactMiddlewares.verifyIsOwner,
    contactControllers.remove);