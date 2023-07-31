import { z } from 'zod';

const loginSchemaRequest = z.object({
    username: z.string(),
    password: z.string()
});

const loginSchemaResponse = z.object({
    id: z.string(),
    full_name: z.string(),
    username: z.string(),
    isAdmin: z.boolean(),
    isActive: z.boolean(),
    registerDate: z.string(),
});

export { loginSchemaRequest, loginSchemaResponse };