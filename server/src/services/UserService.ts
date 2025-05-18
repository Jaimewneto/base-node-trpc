import { hash } from "bcryptjs";

import { UserRepo } from "../repository/UserRepository";

import { NewUser, UserUpdate } from "../database/schema/users";

import { Clause } from "../types/clause";

const findUserById = async (id: string) => {
    return await UserRepo.findUserById(id);
}

const findUserByEmail = async (email: string) => {
    const clause: Clause = { junction: "and", conditions: [{ field: "email", operator: "=", value: email }] };

    return await UserRepo.findUser(clause);
};

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

const updateUser = async (id: string, data: UserUpdate) => {
    const password = data.password ? await hash(data.password, 10) : undefined;

    const user: UserUpdate = {
        ...data,
        password,
    };

    return await UserRepo.updateUser(id, user);
}

const deleteUser = async (id: string) => {
    return await UserRepo.deleteUser(id);
}

export const UserService = {
    findUserById,
    findUserByEmail,
    findUsers,
    createUser,
    updateUser,
    deleteUser,
};
