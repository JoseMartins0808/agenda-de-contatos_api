import { Router } from "express";
import { ensureBodyMiddleware } from "../middlewares/ensureBody.middleware";
import { loginSchemaRequest } from "../schemas/login.schemas";
import loginControllers from "../controllers/loginControllers";
import loginMiddlewares from "../middlewares/loginMiddlewares";

export const loginRoutes: Router = Router();

loginRoutes.post('', ensureBodyMiddleware(loginSchemaRequest), loginMiddlewares.verifyIsActive,
    loginControllers.createToken);
