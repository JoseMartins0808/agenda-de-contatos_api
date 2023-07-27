import { z } from 'zod';
import { loginSchemaRequest } from '../schemas/login.schemas';

type tLoginRequest = z.infer<typeof loginSchemaRequest>;
type tLoginResponse = {
    token: string
};

export { tLoginRequest, tLoginResponse };