import { AuthController } from "@/controllers/AuthController";

import { AuthValidation } from "@/validation/AuthValidation";

import { router, procedure } from "../..";

import { userRouter } from "./user";

const authController = new AuthController();

export const appPublicRouter = router({
    user: userRouter,

    login: procedure
        .input(AuthValidation.loginSchema)
        .mutation(({ input }) => authController.login({ email: input.email, password: input.password })),
});

export type AppPublicRouter = typeof appPublicRouter;
