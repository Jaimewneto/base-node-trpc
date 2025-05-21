import { hash } from "bcryptjs";

import { UserRepository } from "../repository/UserRepository";

import { User, NewUser, UserUpdate } from "../database/schema/users";

import { Where } from "../types/where";

import { client } from "@/database/client";

export class UserService {
    private userRepository = new UserRepository(client);

    async findUserById(id: string) {
        const where: Where<User> = { junction: "and", conditions: [{ field: "id", operator: "=", value: id }] };

        return await this.userRepository.findOne(where);
    }

    async findUserByEmail(email: string) {
        const where: Where<User> = { junction: "and", conditions: [{ field: "email", operator: "=", value: email }] };

        return await this.userRepository.findOne(where);
    };

    async findUsers() {
        return await this.userRepository.findMany();
    };

    async createUser(data: NewUser) {
        const password = await hash(data.password, 10);

        const user: NewUser = {
            ...data,
            password,
        };

        return await this.userRepository.create(user);
    }

    async updateUser(id: string, data: UserUpdate) {
        const password = data.password ? await hash(data.password, 10) : undefined;

        const user: UserUpdate = {
            ...data,
            password,
        };

        return await this.userRepository.update(id, user);
    }

    async deleteUser(id: string) {
        return await this.userRepository.delete(id);
    }
}
