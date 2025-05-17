import { compare } from "bcryptjs";

import { UserRepo } from "../repository/UserRepository";

import { Clause } from "../types/clause";

import { sign } from "../utils/auth";

const authErrorMessage = "Email ou senha incorretos";

const login = async ({ email, password }: { email: string; password: string }) => {
    const clause: Clause = {
        junction: "and",
        conditions: [{ field: "email", operator: "=", value: email }],
    };

    const user = await UserRepo.findUser(clause);

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

export const AuthService = {
    login,
};
