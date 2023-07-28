import {
    ensureUniqueEmail, ensureUniqueFullName, ensureUniquePhone, ensureUniqueUsername,
    verifyUserExistsById, verifyUserIsActive
} from './user.middlewares';

export default {
    ensureUniqueEmail, ensureUniqueFullName, ensureUniquePhone, ensureUniqueUsername,
    verifyUserExistsById, verifyUserIsActive
}