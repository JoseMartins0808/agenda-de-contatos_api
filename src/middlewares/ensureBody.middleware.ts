import { NextFunction, Request, Response } from "express";
import { ZodSchema } from 'zod';

const ensureBodyMiddleware = (schema: ZodSchema) =>
    (request: Request, response: Response, next: NextFunction): void => {

        const data: any = request.body;

        const validatedData: ZodSchema = schema.parse(data);

        request.body = validatedData;

        return next();
    };

export { ensureBodyMiddleware };