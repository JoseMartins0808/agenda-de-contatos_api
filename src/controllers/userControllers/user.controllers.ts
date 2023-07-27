import { Request, Response } from "express";
import userServices from "../../services/userServices";
import { User } from "../../entities/user.entity";

async function create(request: Request, response: Response): Promise<Response> {

    const newUser = await userServices.create(request.body);

    return response.status(201).json(newUser);
};

async function getAll(request: Request, response: Response): Promise<Response> {

    const allUsers: any[] = await userServices.getAll();

    return response.status(200).json(allUsers);
};

async function getUser(request: Request, response: Response): Promise<Response> {

    const userId = request.params.id;

    const userData = await userServices.getUser(userId);

    return response.status(200).json(userData);
};


export { create, getAll, getUser };