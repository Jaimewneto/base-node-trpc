import { hash } from "bcryptjs";

import { UserRepo } from "../repository/UserRepository";

import { NewUser, UserUpdate } from "../database/schema/users";

const findUserById = async (id: number) => {
    return await UserRepo.findUserById(id);
}

const findUsers = async () => {
    return await UserRepo.findUsers();
};

const createUser = async (data: NewUser) => {
    const password = await hash(data.password, 10);

    const user: NewUser = {
        ...data,
        password,
    };

    return await UserRepo.createUser(user);
}

const updateUser = async (id: number, data: UserUpdate) => {
    const password = data.password ? await hash(data.password, 10) : undefined;

    const user: UserUpdate = {
        ...data,
        password,
    };

    return await UserRepo.updateUser(id, user);
}

const deleteUser = async (id: number) => {
    return await UserRepo.deleteUser(id);
}

export const UserService = {
    findUserById,
    findUsers,
    createUser,
    updateUser,
    deleteUser,
};
