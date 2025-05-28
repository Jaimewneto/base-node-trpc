import { hash } from "bcryptjs";

import { UserRepository } from "../repositories/UserRepository";

import { User, NewUser, UserUpdate } from "../database/schema/user";

import { Where } from "../types/query/where";

import { client } from "@/database/client";

import { QueryMany } from "@/types/query";

export class UserService {
    private userRepository = new UserRepository(client);

    async findUserById(id: string) {
        const where: Where<User> = { junction: "and", conditions: [{ field: "id", operator: "=", value: id }] };

        return await this.userRepository.findOne(where);
    }

    async findUserByEmail(email: string) {
        const where: Where<User, "usuario"> = { junction: "and", conditions: [{ field: "usuario.updated_at", operator: "=", value: email }] };

        return await this.userRepository.findOne(where);
    };

    async findUsers(params: QueryMany<User>) {
        const query: QueryMany<User, "user"> = {
            select: ["name"],
            orderBy: [{ field: "user.updated_at", direction: "asc" }],
        }

        return await this.userRepository.findMany(params);
    };

    async createUser(data: NewUser) {
        const password = await hash(data.password, 10);

        const user: NewUser = {
            ...data,
            password,
        };

        return await this.userRepository.create(user);
    }

    async updateUser(data: UserUpdate) {
        const id = data.id!;

        const password = data.password ? await hash(data.password, 10) : undefined;

        const user: UserUpdate = {
            ...data,
            password,
            id: undefined,
        };

        return await this.userRepository.update(id, user);
    }

    async deleteUser(id: string) {
        return await this.userRepository.delete(id);
    }
}
