import { compare } from "bcryptjs";

import { UserRepository } from "@/repositories/UserRepository";

import { Where } from "@/types/where";

import { sign, verify } from "@/utils/auth";

import { User } from "@/database/schema/user";

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
            accessToken: await sign({ payload: { userId: user.id, companyId: user.company_id, role: "user" }, expirationTime: "1h" }),
            refreshToken: await sign({ payload: { userId: user.id, companyId: user.company_id, role: "user" }, expirationTime: "48h" }),
        };
    };

    async refreshToken(token: string) {
        const payload = await verify(token);

        const where: Where<User> = {
            junction: "and",
            conditions: [{ field: "id", operator: "=", value: payload.userId }],
        };

        const user = await this.userRepository.findOne(where);

        if (!user) {
            throw new Error(authErrorMessage);
        }

        return {
            accessToken: await sign({ payload: { userId: user.id, companyId: user.company_id, role: "user" }, expirationTime: "1h" }),
            refreshToken: await sign({ payload: { userId: user.id, companyId: user.company_id, role: "user" }, expirationTime: "72h" }),
        };
    };
}
