import { z } from 'zod';
import { userCreateSchemaResponse, userSchemaRequest, userSchemaResponse, usersSchemaResponse } from '../schemas/user.schemas';

type tUserRequest = z.infer<typeof userSchemaRequest>;
type tUserResponse = z.infer<typeof userSchemaResponse>;
type tUsersResponse = z.infer<typeof usersSchemaResponse>;
type tUserCreateResponse = z.infer<typeof userCreateSchemaResponse>;

export { tUserRequest, tUserResponse, tUserCreateResponse, tUsersResponse };