import { z } from 'zod';

const contactSchema = z.object({
    id: z.string(),
    full_name: z.string(),
    phones: z.string().array(),
    emails: z.string().array(),
    registerDate: z.string()
});

const contactSchemaRequest = contactSchema.omit({
    id: true,
    registerDate: true
});

const updateContactSchema = contactSchemaRequest.partial();

const contactSchemaResponse = z.object({
    id: z.string(),
    full_name: z.string(),
    phones: z.object({ phone: z.string() }).array(),
    emails: z.object({ email: z.string() }).array(),
    registerDate: z.string()
});

const contactsSchemaResponse = contactSchema.array();

export { contactSchema, contactSchemaRequest, contactsSchemaResponse, contactSchemaResponse, updateContactSchema };