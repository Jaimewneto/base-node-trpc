import { AuthController } from "../../../controllers/AuthController";

import { AuthValidation } from "../../../validation/AuthValidation";

import { router, procedure } from "../../trpc";

import { userRouter } from "./user";

export const appPublicRouter = router({
    user: userRouter,

    login: procedure
        .input(AuthValidation.loginSchema)
        .mutation(({ input }) => AuthController.login({ email: input.email, password: input.password })),
});

export type AppPublicRouter = typeof appPublicRouter;
