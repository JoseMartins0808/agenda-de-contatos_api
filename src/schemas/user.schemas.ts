import { z } from 'zod';

const userSchema = z.object({
    id: z.string(),
    full_name: z.string(),
    username: z.string(),
    emails: z.string().email().array(),
    phones: z.string().max(11).array(),
    password: z.string(),
    isAdmin: z.boolean(),
    registerDate: z.date()
});

const userSchemaRequest = userSchema.omit({
    id: true,
    isAdmin: true,
    registerDate: true
});

const userSchemaResponse = userSchema.omit({
    password: true
});

export { userSchema, userSchemaRequest, userSchemaResponse };