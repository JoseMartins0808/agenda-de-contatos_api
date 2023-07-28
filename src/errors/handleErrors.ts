import { NextFunction, Request, Response } from "express";
import { EntityNotFoundError, QueryFailedError } from "typeorm";
import { ZodError } from 'zod';


class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.statusCode = statusCode;
    };
};

function handleErrors(error: Error, request: Request, response: Response, next: NextFunction): Response {

    if (error instanceof AppError) {
        return response.status(error.statusCode).json({ message: error.message });
    };

    if (error instanceof ZodError) {
        return response.status(400).json({ message: error.flatten().fieldErrors });
    };

    if (error instanceof EntityNotFoundError) {
        return response.status(400).json({ message: 'User not found' });
    };

    if (error instanceof QueryFailedError) {
        return response.status(400).json({ message: 'Invalid user uuid sintax' });
    }

    console.log(error);

    return response.status(500).json({ message: "Internal server error" });
};


export { AppError, handleErrors };