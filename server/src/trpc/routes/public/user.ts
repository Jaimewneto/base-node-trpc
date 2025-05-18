import { router, procedure } from "../../trpc";

import { UserController } from "../../../controllers/UserController";

import { UserValidation } from "../../../validation/UserValidation";

export const userRouter = router({
    getUsers: procedure.query(UserController.findUsers),

    createUser: procedure
        .input(UserValidation.createSchema)
        .mutation(({ input }) => UserController.createUser(input)),
});
