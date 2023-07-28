import { NextFunction, Request, Response } from "express";
import { userEmailRepository, userPhoneRepository, userRepository } from "../../data-source";
import { UserEmail } from "../../entities/userEmail.entity";
import { AppError } from "../../errors/handleErrors";
import { UserPhone } from "../../entities/userPhone.entity";
import { User } from "../../entities/user.entity";

async function ensureUniqueEmail(request: Request, response: Response, next: NextFunction): Promise<void> {

    const emails: string[] = request.body.emails;

    for (let index = 0; index < emails.length; index++) {
        const emailFound: UserEmail | null = await userEmailRepository.findOne({ where: { email: emails[index] } });

        if (emailFound) throw new AppError('Email already exists', 409);
    };

    return next();
};

async function ensureUniquePhone(request: Request, response: Response, next: NextFunction): Promise<void> {

    const phones: string[] = request.body.phones;

    for (let index = 0; index < phones.length; index++) {
        const phoneFound: UserPhone | null = await userPhoneRepository.findOne({ where: { phone: phones[index] } });

        if (phoneFound) throw new AppError('Phone already exists', 409);
    }

    return next();
};

async function ensureUniqueFullName(request: Request, response: Response, next: NextFunction): Promise<void> {

    const fullName: string = request.body.full_name;

    const fullNameFound: User | null = await userRepository.findOne({ where: { full_name: fullName } });

    if (fullNameFound) throw new AppError('This full name already exists', 409);

    return next();
};

async function ensureUniqueUsername(request: Request, response: Response, next: NextFunction): Promise<void> {

    const username: string = request.body.username;

    const usernameFound: User | null = await userRepository.findOne({ where: { username: username } });

    if (usernameFound) throw new AppError('Username already exists', 409);

    return next();
};

async function verifyUserExistsById(request: Request, response: Response, next: NextFunction): Promise<void> {

    const userId: string = request.params.userId;

    const userFound: User | null = await userRepository.findOneOrFail({ where: { id: userId } });

    if (!userFound) throw new AppError('User not found', 400);

    response.locals.userFound = userFound;

    next();
};

async function verifyUserIsActive(request: Request, response: Response, next: NextFunction): Promise<void> {

    if (response.locals.userFound.isActive) throw new AppError('User is already active')

    return next();
};

export { ensureUniqueEmail, ensureUniqueFullName, ensureUniquePhone, ensureUniqueUsername, verifyUserExistsById, verifyUserIsActive }