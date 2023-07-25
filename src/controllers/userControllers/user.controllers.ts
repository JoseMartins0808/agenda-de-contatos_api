import { Request, Response } from "express";

async function create(request: Request, response: Response): Promise<Response> {

    return response.status(201).json("FOI!");
};



export { create };