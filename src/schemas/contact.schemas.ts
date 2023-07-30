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

const contactSchemaResponse = contactSchema.omit({ phones: true, emails: true, user: true });

const contactsSchemaResponse = contactSchema.array();

export { contactSchema, contactSchemaRequest, contactsSchemaResponse, contactSchemaResponse };