import { Request, Response, NextFunction } from 'express';
import { contactEmailRepository, contactPhoneRepository, contactRepository } from '../../data-source';
import { ContactEmail } from '../../entities/contactEmail.entity';
import { AppError } from '../../errors/handleErrors';
import { ContactPhone } from '../../entities/contactPhone.entity';
import { Contact } from '../../entities/contact.entity';

async function ensureUniqueEmail(request: Request, response: Response, next: NextFunction): Promise<void> {

    const emails: string[] = request.body.emails;

    for (let index = 0; index < emails.length; index++) {
        const emailFound: ContactEmail | null = await contactEmailRepository.findOne({ where: { email: emails[index] }, relations: { contact: true } });

        if (emailFound?.contact) throw new AppError('Email already exists', 409);
    };

    return next();
};

async function ensureUniquePhone(request: Request, response: Response, next: NextFunction): Promise<void> {

    const phones: string[] = request.body.phones;

    for (let index = 0; index < phones.length; index++) {
        const phoneFound: ContactPhone | null = await contactPhoneRepository.findOne({ where: { phone: phones[index] }, relations: { contact: true } });

        if (phoneFound?.contact) throw new AppError('Phone already exists', 409);
    }

    return next();
};

async function ensureUniqueFullName(request: Request, response: Response, next: NextFunction): Promise<void> {

    const fullName: string = request.body.full_name;

    const fullNameFound: Contact | null = await contactRepository.findOne({ where: { full_name: fullName } });

    if (fullNameFound) throw new AppError('This full name already exists', 409);

    return next();
};

async function verifyIsOwner(request: Request, response: Response, next: NextFunction): Promise<void> {

    const userId: string = response.locals.userId;

    const contactFound: Contact | null = await contactRepository.findOne({ where: { id: request.params.contactId }, relations: { user: true } });

    if (!contactFound) throw new AppError('Contact not found', 409);

    if (userId !== contactFound.user.id) throw new AppError('Insufficient permission', 403);

    next();
};

export { ensureUniqueEmail, ensureUniqueFullName, ensureUniquePhone, verifyIsOwner };