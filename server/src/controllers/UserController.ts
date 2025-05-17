import { UserService } from "../services/UserService";

import { NewUser, UserUpdate } from "../database/schema/users";

const findUserById = async (id: number) => {
    try {
        return await UserService.findUserById(id);
    } catch (error) {
        throw error;
    }
}

const findUsers = async () => {
    try {
        return await UserService.findUsers();
    } catch (error) {
        throw error;
    }
}

const createUser = async (input: NewUser) => {
    try {
        return await UserService.createUser(input);
    } catch (error) {
        throw error;
    }
}

const updateUser = async (id: number, input: UserUpdate) => {
    try {
        return await UserService.updateUser(id, input);
    } catch (error) {
        throw error;
    }
}

const deleteUser = async (id: number) => {
    try {
        return await UserService.deleteUser(id);
    } catch (error) {
        throw error;
    }
}

export const UserController = {
    findUserById,
    findUsers,
    createUser,
    updateUser,
    deleteUser,
};
