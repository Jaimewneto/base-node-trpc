import { AuthController } from "../../../controllers/AuthController";

import { AuthValidation } from "../../../validation/AuthValidation";

import { t } from "../../trpc";

import { userRouter } from "./user";

export const appPublicRouter = t.router({
    user: userRouter,

    login: t.procedure
        .input(AuthValidation.loginSchema)
        .mutation(({ input }) => AuthController.login({ email: input.email, password: input.password })),
});

export type AppPublicRouter = typeof appPublicRouter;
