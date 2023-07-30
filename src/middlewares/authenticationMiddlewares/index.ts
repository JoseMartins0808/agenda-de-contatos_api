import { verifyIsActiveForLogin, verifyIsAdmin, verifyIsAdminOrOwner, verifyIsActiveByToken } from './authentication.middlewares';

export default {
    verifyIsActiveForLogin,
    verifyIsAdmin,
    verifyIsAdminOrOwner,
    verifyIsActiveByToken
};