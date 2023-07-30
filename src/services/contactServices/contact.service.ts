import { Response } from "express";
import { contactEmailRepository, contactPhoneRepository, contactRepository, userRepository } from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { ContactEmail } from "../../entities/contactEmail.entity";
import { ContactPhone } from "../../entities/contactPhone.entity";
import { User } from "../../entities/user.entity";
import { contactSchemaResponse } from "../../schemas/contact.schemas";

const create = async (payload: any, response: Response) => {

    const user: User | null = await userRepository.findOne({ where: { id: response.locals.userId } });

    const newContact: Contact = contactRepository.create({
        full_name: payload.full_name,
        user: user!
    });

    const contactSaved = await contactRepository.save(newContact);

    payload.emails.forEach(async (email: string) => {
        const newEmail: ContactEmail = contactEmailRepository.create({ email: email, contact: contactSaved });

        await contactEmailRepository.save(newEmail);
    });

    payload.phones.forEach(async (phone: string) => {
        const newPhone: ContactPhone = contactPhoneRepository.create({ phone: phone, contact: contactSaved });

        await contactPhoneRepository.save(newPhone);
    });

    return contactSchemaResponse.parse(contactSaved);
};

const getAll = async (userId: string) => {

    const contacts = await contactRepository.find({ where: { user: { id: userId } }, relations: { phones: true, emails: true } })

    return contacts;
};

const remove = async (contactId: string) => {

    const contatc = await contactRepository.findOne({ where: { id: contactId } });

    await contactRepository.remove(contatc!);

};

export { create, getAll, remove };