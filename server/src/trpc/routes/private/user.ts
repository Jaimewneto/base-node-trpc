import { t } from "../../trpc";

import { UserController } from "../../../controllers/UserController";

import { UserValidation } from "../../../validation/UserValidation";

export const userRouter = t.router({
    getUser: t.procedure
        .input(UserValidation.identifierSchema)
        .query(({ input }) => UserController.findUserById(input.id)),


    getUsers: t.procedure.query(UserController.findUsers),

    createUser: t.procedure
        .input(UserValidation.createSchema)
        .mutation(({ input }) => UserController.createUser(input)),

    updateUser: t.procedure
        .input(UserValidation.patchSchema)
        .mutation(({ input }) => UserController.updateUser(input.id, input)),

    deleteUser: t.procedure
        .input(UserValidation.identifierSchema)
        .mutation(({ input }) => UserController.deleteUser(input.id)),
});
