import { Request, Response } from "express";
import { tUserRequest } from "../../interfaces/user.interfaces";
import { userEmailRepository, userPhoneRepository, userRepository } from "../../data-source";
import { User } from "../../entities/user.entity";
import { UserPhone } from "../../entities/userPhone.entity";
import { UserEmail } from "../../entities/userEmail.entity";

const create = async (data: tUserRequest): Promise<User> => {

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

    return newUser;
};

export { create }