import { NextFunction, Request, Response } from "express";
import { ZodError } from 'zod';


// class AppError extends Error {
//     statusCode: number;

//     constructor(message: string, statusCode: number = 400) {
//         super(message);
//         this.statusCode = statusCode;
//     };
// };

// function handleErrors(error: Error, request: Request, response: Response, next: NextFunction): Response {
//     console.log('EEERRRRPPPPPRRRRR' + error)

//     if (error instanceof AppError) {
//         console.log('EEERRRRPPPPPRRRRR' + error)
//         return response.status(error.statusCode).json({ message: error.message });
//     };

//     if (error instanceof ZodError) {
//         return response.status(400).json({ message: error.flatten().fieldErrors })
//     };

//     console.log(error);

//     return response.status(500).json({ message: "Internal server error" });
// };

export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.statusCode = statusCode;
    };
};

export function handleErrors(err: Error, _req: Request, res: Response, _next: NextFunction) {

    if (err instanceof AppError) {
        console.log('EEEEEEEEEEEEEERRRROOOO')
        return res.status(err.statusCode).json({ message: err.message })
    };

    if (err instanceof ZodError) {
        console.log('EEEEEEEEEEEEEERRRROOOO')
        return res.status(400).json({ message: err.flatten().fieldErrors })
    };

    console.log(err);

    return res.status(500).json({ message: 'Internal server error.' });
};

// export { AppError, handleErrors };