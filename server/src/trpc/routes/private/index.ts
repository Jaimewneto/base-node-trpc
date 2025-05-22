import { AuthValidation } from "@/validation/AuthValidation";
import { protectedProcedure, router } from "../..";

import { userRouter } from "./user";

import { AuthController } from "@/controllers/AuthController";

const authController = new AuthController();

export const appPrivateRouter = router({
    user: userRouter, // access via user.getUsers, user.createUser, etc.

    refreshToken: protectedProcedure
            .input(AuthValidation.refreshTokenSchema)
            .query(({ input }) => authController.refreshToken(input.refreshToken)),
});

export type AppPrivateRouter = typeof appPrivateRouter;
