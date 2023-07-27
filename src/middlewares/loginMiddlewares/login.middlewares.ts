import { NextFunction, Request, Response } from "express";
import { userRepository } from "../../data-source";
import { AppError } from "../../errors/handleErrors";
import { User } from "../../entities/user.entity";


async function verifyIsActive(request: Request, response: Response, next: NextFunction): Promise<void> {

    const userFound: User | null = await userRepository.findOne({ where: { username: request.body.username } });

    if (!userFound) throw new AppError('Invalid credentials', 401);

    response.locals.userFound = userFound;

    return next();
};

export { verifyIsActive };