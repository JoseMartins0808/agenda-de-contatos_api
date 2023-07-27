import { tUserCreateResponse, tUserRequest, tUserResponse, tUsersResponse } from "../../interfaces/user.interfaces";
import { userEmailRepository, userPhoneRepository, userRepository } from "../../data-source";
import { User } from "../../entities/user.entity";
import { UserPhone } from "../../entities/userPhone.entity";
import { UserEmail } from "../../entities/userEmail.entity";
import { userCreateSchemaResponse, userSchemaResponse, usersSchemaResponse } from "../../schemas/user.schemas";

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


export { create, getAll, getUser }