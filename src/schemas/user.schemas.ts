import { z } from 'zod';

const userSchema = z.object({
    id: z.string(),
    full_name: z.string(),
    username: z.string(),
    emails: z.string().email().array(),
    phones: z.string().max(11).array(),
    password: z.string(),
    isActive: z.boolean(),
    isAdmin: z.boolean(),
    registerDate: z.string()
});

const userSchemaRequest = userSchema.omit({
    id: true,
    isAdmin: true,
    isActive: true,
    registerDate: true,
});

const userUpdateSchemaRequest = userSchemaRequest.partial();

const userSchemaResponse = z.object({
    id: z.string(),
    full_name: z.string(),
    username: z.string(),
    isAdmin: z.boolean(),
    isActive: z.boolean(),
    registerDate: z.string(),
    deletedAt: z.string().nullable(),
    emails: z.object({ email: z.string() }).array(),
    phones: z.object({ phone: z.string() }).array()
});

const usersSchemaResponse = userSchemaResponse.array();

const userCreateSchemaResponse = z.object({
    id: z.string(),
    username: z.string(),
    full_name: z.string(),
    registerDate: z.string(),
    isAdmin: z.boolean(),
    isActive: z.boolean()
});

export { userSchema, userSchemaRequest, userSchemaResponse, usersSchemaResponse, userCreateSchemaResponse, userUpdateSchemaRequest };