import { Request, Response } from "express";
import userServices from "../../services/userServices";

async function create(request: Request, response: Response): Promise<Response> {

    const newUser = await userServices.create(request.body);

    return response.status(201).json(newUser);
};



export { create };