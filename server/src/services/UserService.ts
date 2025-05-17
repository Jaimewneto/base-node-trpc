import { hash } from "bcryptjs";

import { UserRepo } from "../repository/UserRepository";

import { NewUser } from "../database/schema/users";

const findUserById = async (id: number) => {
    return await UserRepo.findUserById(id);
}

const findUsers = async () => {
    return await UserRepo.findUsers();
};

const createUser = async (input: {
    name: string;
    email: string;
    password: string;
}) => {
    const hashedPassword = await hash(input.password, 10);

    const user: NewUser = {
        name: input.name,
        email: input.email,
        password: hashedPassword,
    };

    return await UserRepo.createUser(user);
}

export const UserService = {
    findUserById,
    findUsers,
    createUser,
};
