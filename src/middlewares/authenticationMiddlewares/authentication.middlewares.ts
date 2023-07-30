import { NextFunction, Request, Response } from "express";
import { userRepository } from "../../data-source";
import { AppError } from "../../errors/handleErrors";
import { User } from "../../entities/user.entity";
import { verify } from 'jsonwebtoken';
import 'dotenv/config';

async function verifyIsActiveForLogin(request: Request, response: Response, next: NextFunction): Promise<void> {

    const userFound: User | null = await userRepository.findOne({ where: { username: request.body.username } });

    if (!userFound) throw new AppError('Invalid credentials', 401);

    if (!userFound.isActive) throw new AppError('User deactivated', 401);

    response.locals.userFound = userFound;

    return next();
};

async function verifyIsActiveByToken(request: Request, response: Response, next: NextFunction): Promise<void> {

    const authorization: string | undefined = request.headers.authorization;

    if (!authorization) throw new AppError('Missing bearer token', 401);

    const token: string = authorization.split(' ')[1];

    verify(token, process.env.SECRET_KEY!, (error: any, decoded: any) => {

        if (error) throw new AppError(error.message, 401);

        if (!decoded.isActive) throw new AppError('User deactivated', 401);

        response.locals.userId = decoded.sub;

    });

    next();
};

async function verifyIsAdmin(request: Request, response: Response, next: NextFunction): Promise<void> {

    const authorization: string | undefined = request.headers.authorization;

    if (!authorization) throw new AppError('Missing bearer token', 401);

    const token: string = authorization.split(' ')[1];

    verify(token, process.env.SECRET_KEY!, (error: any, decoded: any) => {

        if (error) throw new AppError(error.message, 401);

        if (!decoded.isAdmin) throw new AppError('Insufficient permission', 403);

    });

    return next();
};

async function verifyIsAdminOrOwner(request: Request, response: Response, next: NextFunction): Promise<void> {

    const authorization: string | undefined = request.headers.authorization;

    if (!authorization) throw new AppError('Missing bearer token', 401);

    const token = authorization.split(' ')[1];

    verify(token, process.env.SECRET_KEY!, async (error: any, decoded: any) => {

        if (error) throw new AppError(error.message, 401);

        if (!decoded.isAdmin && (response.locals.userFound.id !== decoded.sub))
            throw new AppError('Insufficient permission');
    });

    return next();
};

export {
    verifyIsActiveForLogin,
    verifyIsAdmin,
    verifyIsAdminOrOwner,
    verifyIsActiveByToken
};