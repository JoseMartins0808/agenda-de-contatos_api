import { Response } from "express";
import { contactEmailRepository, contactPhoneRepository, contactRepository, userRepository } from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { ContactEmail } from "../../entities/contactEmail.entity";
import { ContactPhone } from "../../entities/contactPhone.entity";
import { User } from "../../entities/user.entity";
import { contactSchemaResponse } from "../../schemas/contact.schemas";

const create = async (payload: any, response: Response) => {

    let emailArray = [];
    let phonesArray = [];

    for (let index = 0; index < payload.emails.length; index++) {
        let object = {
            email: payload.emails[index]
        };
        emailArray.push(object);
    };

    for (let index = 0; index < payload.phones.length; index++) {
        let object = {
            phone: payload.phones[index]
        };
        phonesArray.push(object);
    }

    const user: User | null = await userRepository.findOne({ where: { id: response.locals.userId } });

    let newContact: Contact = contactRepository.create({
        full_name: payload.full_name,
        user: user!,
        emails: emailArray,
        phones: phonesArray
    });

    const contactSaved = await contactRepository.save(newContact);

    payload.emails.map(async (email: string) => {
        const newEmail: ContactEmail = contactEmailRepository.create({ email: email, contact: contactSaved });

        const emailSaved = await contactEmailRepository.save(newEmail);
    });

    payload.phones.map(async (phone: string) => {
        const newPhone: ContactPhone = contactPhoneRepository.create({ phone: phone, contact: contactSaved });

        await contactPhoneRepository.save(newPhone);
    });


    return contactSchemaResponse.parse(newContact);
};

const update = async (data: any, response: Response) => {

    const oldData: Contact = response.locals.contact;
    let phonesArray: ContactPhone[] = [];
    let emailsArray: ContactEmail[] = [];

    for (let index = 0; index < data.phones.length; index++) {
        const phoneFound = await contactPhoneRepository.findOne({ where: { phone: data.phones[index] }, relations: { contact: true } });

        if (!phoneFound) {
            const newPhone = contactPhoneRepository.create({ phone: data.phones[index] });
            const savePhone = await contactPhoneRepository.save(newPhone);
            phonesArray.push(savePhone);

        } else {
            phonesArray.push(phoneFound);
        };
    };

    for (let index = 0; index < data.emails.length; index++) {
        const emailFound = await contactEmailRepository.findOne({ where: { email: data.emails[index] }, relations: { contact: true } });

        if (!emailFound) {
            const newEmail = contactEmailRepository.create({ email: data.emails[index] });
            const saveEmail = await contactEmailRepository.save(newEmail);
            emailsArray.push(saveEmail);

        } else {
            emailsArray.push(emailFound);
        };
    };

    const newContactData = contactRepository.create({
        ...oldData,
        ...data,
        phones: phonesArray,
        emails: emailsArray
    });

    const updateContact = await contactRepository.save(newContactData);

    return updateContact;
}

const getAll = async (userId: string) => {

    const contacts = await contactRepository.find({ where: { user: { id: userId } }, relations: { phones: true, emails: true }, order: { full_name: 'asc' } })

    return contacts;
};

const remove = async (contactId: string) => {

    const contatc = await contactRepository.findOne({ where: { id: contactId } });

    await contactRepository.remove(contatc!);

};

export { create, getAll, remove, update };