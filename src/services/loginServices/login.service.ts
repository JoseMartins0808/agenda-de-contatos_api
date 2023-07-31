import { tLoginRequest } from "../../interfaces/login.interfaces";
import { User } from "../../entities/user.entity";
import { compare } from 'bcryptjs';
import { AppError } from "../../errors/handleErrors";
import { sign } from 'jsonwebtoken';
import { Response } from "express";
import 'dotenv/config';
import { userSchemaResponse } from "../../schemas/user.schemas";
import { loginSchemaResponse } from "../../schemas/login.schemas";

const createToken = async (loginData: tLoginRequest, response: Response) => {

    const user: User = response.locals.userFound;

    const verifyPass: boolean = await compare(loginData.password, user.password);

    if (!verifyPass) throw new AppError('Invalid credentials', 401);

    const newToken: string = sign({
        isActive: user.isActive,
        isAdmin: user.isAdmin,
    }, process.env.SECRET_KEY!, {
        expiresIn: '24h',
        subject: user.id
    });

    const userResponse = loginSchemaResponse.parse(user);

    return { token: newToken, user: userResponse };
};

export { createToken }