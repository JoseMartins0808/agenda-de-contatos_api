import { Request, Response } from "express";
import userServices from "../../services/userServices";
import { User } from "../../entities/user.entity";
import { usersSchemaResponse } from "../../schemas/user.schemas";

async function create(request: Request, response: Response): Promise<Response> {

    const newUser = await userServices.create(request.body);

    return response.status(201).json(newUser);
};

async function getAll(request: Request, response: Response): Promise<Response> {

    const allUsers: any[] = await userServices.getAll();

    return response.status(200).json(allUsers);
};

async function getUser(request: Request, response: Response): Promise<Response> {

    const userId: string = request.params.userId;

    const userData = await userServices.getUser(userId);

    return response.status(200).json(userData);
};

async function updateUser(request: Request, response: Response): Promise<Response> {

    const updateUser = await userServices.update(request.body, response);

    return response.status(200).json(updateUser);
};

async function softDelete(request: Request, response: Response): Promise<Response> {

    await userServices.softDelete(request.params.userId, response);

    return response.status(204).send();
};

async function reactivateUser(request: Request, response: Response): Promise<Response> {

    const reactivateUser = await userServices.reactivate(request.params.userId, response);

    return response.status(200).json(reactivateUser)
};


export { create, getAll, getUser, updateUser, softDelete, reactivateUser };