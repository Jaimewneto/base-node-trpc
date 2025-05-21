import { compare } from "bcryptjs";

import { UserRepository } from "@/repository/UserRepository";

import { Where } from "@/types/where";

import { sign } from "@/utils/auth";

import { User } from "@/database/schema/users";

import { client } from "@/database/client";

const authErrorMessage = "Email ou senha incorretos";

export class AuthService {
    private userRepository = new UserRepository(client);

    async login({ email, password }: { email: string; password: string }) {
        const where: Where<User> = {
            junction: "and",
            conditions: [{ field: "email", operator: "=", value: email }],
        };

        const user = await this.userRepository.findOne(where);

        if (!user) {
            throw new Error(authErrorMessage);
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error(authErrorMessage);
        }

        return {
            accessToken: await sign({ payload: { id: user.id }, expirationTime: "1h" }),
            refreshToken: await sign({ payload: { id: user.id }, expirationTime: "48h" }),
        };
    };
}
