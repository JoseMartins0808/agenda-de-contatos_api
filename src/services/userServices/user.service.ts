import { tUserCreateResponse, tUserRequest, tUserResponse, tUsersResponse } from "../../interfaces/user.interfaces";
import { userEmailRepository, userPhoneRepository, userRepository } from "../../data-source";
import { User } from "../../entities/user.entity";
import { UserPhone } from "../../entities/userPhone.entity";
import { UserEmail } from "../../entities/userEmail.entity";
import { userCreateSchemaResponse, userSchemaResponse, usersSchemaResponse } from "../../schemas/user.schemas";
import { Request, Response } from "express";
import { AppError } from "../../errors/handleErrors";

const create = async (data: tUserRequest): Promise<tUserCreateResponse> => {

    const newUser: User = userRepository.create({
        full_name: data.full_name,
        username: data.username,
        password: data.password,
    });

    await userRepository.save(newUser);

    data.emails.forEach(async (email) => {
        const newEmail: UserEmail = userEmailRepository.create({ email: email, user: newUser });

        await userEmailRepository.save(newEmail);
    });

    data.phones.forEach(async (phone) => {
        const newPhone: UserPhone = userPhoneRepository.create({ phone: phone, user: newUser });

        await userPhoneRepository.save(newPhone);
    });

    return userCreateSchemaResponse.parse(newUser);
};

const getAll = async (): Promise<tUsersResponse> => {

    const allUsers: User[] = await userRepository.find({ relations: { phones: true, emails: true } });

    return usersSchemaResponse.parse(allUsers)
};

const getUser = async (userId: string): Promise<tUserResponse> => {

    const userData = await userRepository.findOne({ where: { id: userId }, relations: { phones: true, emails: true } });

    return userSchemaResponse.parse(userData)
};

const update = async (payload: any, response: Response): Promise<tUserResponse> => {

    const oldUserData: User = response.locals.userFound;
    let phonesArray: UserPhone[] = [];
    let emailsArray: UserEmail[] = [];

    for (let index = 0; index < payload.phones.length; index++) {
        const phoneFound = await userPhoneRepository.findOne({ where: { phone: payload.phones[index] }, relations: { user: true } });

        if (!phoneFound) {
            const newPhone = userPhoneRepository.create({ phone: payload.phones[index] });
            const saveNewPhone = await userPhoneRepository.save(newPhone)
            phonesArray.push(saveNewPhone);

        } else if (phoneFound && phoneFound.user) {
            if (phoneFound.user.id === oldUserData.id) {
                phonesArray.push(phoneFound);
            } else {
                throw new AppError(`The phone |${phoneFound.phone}| has another owner`);
            }
        } else if (phoneFound && !phoneFound.user) {
            phonesArray.push(phoneFound);
        };
    };

    for (let index = 0; index < payload.emails.length; index++) {
        const emailFound = await userEmailRepository.findOne({ where: { email: payload.emails[index] }, relations: { user: true } });

        if (!emailFound) {
            const newEmail = userEmailRepository.create({ email: payload.emails[index] });
            const saveNewEmail = await userEmailRepository.save(newEmail);
            emailsArray.push(saveNewEmail);

        } else if (emailFound && emailFound.user) {
            if (emailFound.user.id === oldUserData.id) {
                emailsArray.push(emailFound);
            } else {
                throw new AppError(`The email |${emailFound.email}| has another owner`);
            }
        } else if (emailFound && !emailFound.user) {
            emailsArray.push(emailFound);
        };
    };

    const newUserData = userRepository.create({
        ...oldUserData,
        ...payload,
        phones: phonesArray,
        emails: emailsArray
    });

    const updateUser = await userRepository.save(newUserData);

    return userSchemaResponse.parse(updateUser);
};

const softDelete = async (userId: string, response: Response): Promise<void> => {

    const oldUserData: User = response.locals.userFound;

    const today = new Date().toLocaleDateString();

    const deactivateUser = userRepository.create({
        ...oldUserData,
        isActive: false,
        deletedAt: today,
        phones: [],
        emails: []
    });

    userRepository.save(deactivateUser);
};

const reactivate = async (userId: string, response: Response): Promise<any> => {

    const oldUserData: User = response.locals.userFound;

    const reactivateUser = userRepository.create({
        ...oldUserData,
        isActive: true,
        deletedAt: null!,
        phones: [],
        emails: []
    });

    const activeUser = await userRepository.save(reactivateUser);

    return userSchemaResponse.parse(activeUser);
};

export { create, getAll, getUser, update, softDelete, reactivate }