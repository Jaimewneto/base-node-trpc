import { router, protectedProcedure } from "../..";

import { UserController } from "../../../controllers/UserController";

import { UserValidation } from "../../../validation/UserValidation";

export const userRouter = router({
    getUser: protectedProcedure
        .input(UserValidation.identifierSchema)
        .query(({ input }) => UserController.findUserById(input.id)),

    getUsers: protectedProcedure.query(UserController.findUsers),

    updateUser: protectedProcedure
        .input(UserValidation.patchSchema)
        .mutation(({ input }) => UserController.updateUser(input.id, input)),

    deleteUser: protectedProcedure
        .input(UserValidation.identifierSchema)
        .mutation(({ input }) => UserController.deleteUser(input.id)),
});
