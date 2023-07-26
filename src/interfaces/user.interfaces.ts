import { z } from 'zod';
import { userSchemaRequest, userSchemaResponse } from '../schemas/user.schemas';

type tUserRequest = z.infer<typeof userSchemaRequest>;
type tUserResponse = z.infer<typeof userSchemaResponse>;

export { tUserRequest, tUserResponse };