import { UserService } from "../services/UserService";

const findUserById = async (id: number) => {
    return await UserService.findUserById(id);
}

const findUsers = async () => {
    return await UserService.findUsers();
}

const createUser = async (input: {
    name: string;
    email: string;
    password: string;
}) => {
    return await UserService.createUser(input);
}

export const UserController = {
    findUserById,
    findUsers,
    createUser,
};
