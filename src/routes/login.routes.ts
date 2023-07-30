import { Router } from "express";
import { ensureBodyMiddleware } from "../middlewares/ensureBody.middleware";
import { loginSchemaRequest } from "../schemas/login.schemas";
import loginControllers from "../controllers/loginControllers";
import authenticationMiddlewares from "../middlewares/authenticationMiddlewares";

export const loginRoutes: Router = Router();

loginRoutes.post('', ensureBodyMiddleware(loginSchemaRequest), authenticationMiddlewares.verifyIsActiveForLogin,
    loginControllers.createToken);
