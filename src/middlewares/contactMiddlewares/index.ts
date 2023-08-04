import { ensureUniqueEmail, ensureUniqueFullName, ensureUniquePhone, verifyIsOwner, verifyExists } from './contact.middlewares';

export default {
    ensureUniqueEmail,
    ensureUniqueFullName,
    ensureUniquePhone,
    verifyIsOwner,
    verifyExists
};