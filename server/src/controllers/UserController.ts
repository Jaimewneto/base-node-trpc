import * as UserService from '../services/UserService';

export async function pingController() {
    return "pong";
}

export async function getUsersController() {
    return await UserService.getUsers();
}

export async function createUserController(input: {
    name: string;
    email: string;
    password: string;
}) {
    return await UserService.createUser(input);
}
