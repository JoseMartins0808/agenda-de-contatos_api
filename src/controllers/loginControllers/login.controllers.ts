import { Request, Response } from "express";
import loginServices from "../../services/loginServices";


async function createToken(request: Request, response: Response): Promise<Response> {

    const token = await loginServices.createToken(request.body, response);

    return response.status(200).json({ token: token });
};

export { createToken };