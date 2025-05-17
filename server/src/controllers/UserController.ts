import { UserService } from "../services/UserService";

import { NewUser, UserUpdate } from "../database/schema/users";

const findUserById = async (id: number) => {
    return await UserService.findUserById(id);
}

const findUsers = async () => {
    return await UserService.findUsers();
}

const createUser = async (input: NewUser) => {
    return await UserService.createUser(input);
}

const updateUser = async (id: number, input: UserUpdate) => {
    return await UserService.updateUser(id, input);
}

const deleteUser = async (id: number) => {
    return await UserService.deleteUser(id);
}

export const UserController = {
    findUserById,
    findUsers,
    createUser,
    updateUser,
    deleteUser,
};
