import { t } from "../../trpc";

import { UserController } from "../../../controllers/UserController";

import { UserValidation } from "../../../validation/UserValidation";

export const userRouter = t.router({
    getUsers: t.procedure.query(UserController.findUsers),

    createUser: t.procedure
        .input(UserValidation.createSchema)
        .mutation(({ input }) => UserController.createUser(input)),
});
