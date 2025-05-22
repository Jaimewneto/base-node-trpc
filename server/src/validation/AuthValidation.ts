import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

const refreshTokenSchema = z.object({
    refreshToken: z.string(),
});

export const AuthValidation = {
    loginSchema,
    refreshTokenSchema,
};
