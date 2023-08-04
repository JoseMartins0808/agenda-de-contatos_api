import { Request, Response } from "express";
import contactServices from "../../services/contactServices";

async function create(request: Request, response: Response): Promise<Response> {

    const newContact = await contactServices.create(request.body, response);

    return response.status(201).json(newContact);
};

async function getAll(request: Request, response: Response): Promise<Response> {

    const allContacts = await contactServices.getAll(response.locals.userId);

    return response.status(200).json(allContacts);
};

async function update(request: Request, response: Response): Promise<Response> {

    const updateContact = await contactServices.update(request.body, response);

    return response.status(200).json(updateContact);
};

async function remove(request: Request, response: Response): Promise<Response> {

    await contactServices.remove(request.params.contactId);

    return response.status(204).send();
};

export { create, getAll, remove, update };