import { z } from 'zod';

const loginSchemaRequest = z.object({
    username: z.string(),
    password: z.string()
});

export { loginSchemaRequest };