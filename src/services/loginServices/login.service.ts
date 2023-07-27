import { tLoginRequest } from "../../interfaces/login.interfaces";
import { userRepository } from "../../data-source";
import { User } from "../../entities/user.entity";
import { compare } from 'bcryptjs';
import { AppError } from "../../errors/handleErrors";
import { sign } from 'jsonwebtoken';
import { Response } from "express";
import 'dotenv/config';
import { tokenToString } from "typescript";

const createToken = async (loginData: tLoginRequest, response: Response) => {

    console.log(response.locals.userFound.password);

    const user: User = response.locals.userFound;

    const verifyPass: boolean = await compare(loginData.password, user.password);

    if (!verifyPass) throw new AppError('Invalid credentials', 401);

    const newToken: string = sign({
        isActive: user.isActive,
        isAdmin: user.isAdmin
    }, process.env.SECRET_KEY!, {
        expiresIn: '24h',
        subject: user.id
    });

    return newToken;
};

export { createToken }